import { LitElement } from 'lit';
import { template } from './flashcard.html';
import { styles } from './flashcard.css';
import { Note } from '../../musictheory';
import { PracticeSetsController } from '../../models/practicesets.js';
import { ScoreModelController } from '../../models/score';
import { TimerController } from '../../models/timer';
import { InputsController, MidiController } from '../../inputs/index.js';
import { PlayModeEvent } from './playmodeevent';
import { App } from '../app';

export class FlashCard extends LitElement {
    static get styles() { return [ styles ] }

    static properties = {
        currentQuestion: { type: String },
        queuedQuestion: { type: String },
        mode: { type: String },
        currentAttempt: { type: Array },
        started: { type: Boolean },
        transition: { type: Boolean, reflect: true },
    };

    constructor() {
        super();
        this.started = false;
        this.currentQuestion = undefined;

        this.timer.start();
        this.transition = true;
        this.transitionToNextQuestion();
        this._countDown = 15;
    }

    score = new ScoreModelController(this);
    timer = new TimerController(this);
    practiceset = new PracticeSetsController(this);
    inputs = new InputsController(this);
    currentAttempt = [];

    /**
     * count down (in seconds) for liveplay
     * @param val
     */
    set countDown(val) {
        this._countDown = val;
        this.timer.resetCountdownTimer(this._countDown);
        this.requestUpdate('countDown');
    }

    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);

        if (this.timer.remainingTime === 0) {
            this.nextQuestion();
        }
        if (_changedProperties.has('transition')) {
            this.dispatchEvent(new PlayModeEvent({
                playing: _changedProperties.get('transition'),
                question: this.currentQuestion ? this.currentQuestion : undefined }))
        }
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        document.addEventListener("keyup", (event) => {
            if (event.code === 'Space' && this.mode === App.LIVEPLAY_MODE) {
                this.nextQuestion();
                return;
            }
        });
        InputsController.addListener( (data) => {
            if (data.type === 'down' && data.note + data.octave === MidiController.nextQuestionTrigger) {
                this.nextQuestion();
                return;
            }
            if (this.currentQuestion && !this.transition) {
                if (this.mode === App.QUIZ_MODE) {
                    this.onQuizListener(data);
                } else if (this.mode === App.LIVEPLAY_MODE) {
                    this.onFreePlayListener(data);
                }
            }
        });
    }

    onFreePlayListener(data) {
        if (data.type === 'down') {
            if (InputsController.notes.length === 1 && InputsController.notes[0] === MidiController.nextQuestionTrigger) {
                return;
            }
            const correct = this.currentQuestion.isCorrect(InputsController.notes);
            if (correct === false) {
                this.onIncorrect(false);
            }
        }
    }

    onQuizListener() {
        if (InputsController.notes.length === 1 && InputsController.notes[0] === MidiController.nextQuestionTrigger) {
            return;
        }
        this.currentAttempt.push(...InputsController.notes);
        this.currentAttempt = [...new Set(this.currentAttempt)];
        this.currentAttempt = Note.sort(this.currentAttempt);
        const correct = this.currentQuestion.isCorrect(this.currentAttempt);
        if (correct === true) {
            this.onCorrect();
        } else if (correct === false) {
            this.onIncorrect();
        }
    }

    onCorrect(advanceNext = true) {
        this.score.incrementCorrect(this.currentQuestion.chord, this.currentQuestion.inversion);
        if (advanceNext) {
            this.transitionToNextQuestion();
        }
        const event = new Event('correct', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }

    onIncorrect(advanceNext = true) {
        this.score.incrementIncorrect(this.currentQuestion.chord, this.currentQuestion.inversion);
        if (advanceNext) {
            this.transitionToNextQuestion();
        }
        const event = new Event('incorrect', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }

    transitionToNextQuestion() {
        this.transition = true;
        this.currentAttempt = [];
        setTimeout(() => {
            this.currentQuestion = undefined;
            this.timer.resetQuestionTimer();
            this.nextQuestion();
            this.transition = false;
        }, 3500);
    }

    nextQuestion() {
        if (this.mode === App.LIVEPLAY_MODE) {
            this.timer.resetCountdownTimer(this._countDown);
        } else {
            this.timer.resetQuestionTimer();
        }
        this.currentQuestion = this.practiceset.next(
            this.mode === App.LIVEPLAY_MODE ? true : false);
    }

    render() {
        return template(this);
    }
}

customElements.define('bsharp-flashcard', FlashCard);
