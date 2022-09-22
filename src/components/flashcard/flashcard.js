import { LitElement } from 'lit';
import { template } from './flashcard.html';
import { styles } from './flashcard.css';
import { Note } from '../../musictheory';
import { PracticeSetsController } from '../../models/practicesets.js';
import { ScoreModelController } from '../../models/score';
import { TimerController } from '../../models/timer';
import { InputsController } from '../../inputs/index.js';
import { PlayModeEvent } from './playmodeevent';
import { App } from '../app';

export class FlashCard extends LitElement {
    static get styles() { return [ styles ] }

    static NOTES_TO_AUTOMATICALLY_TRANSITION = 5;

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

        this.practiceset.addListener((e) => {
            if (e.type === 'setquestion') {
                this.goCurrentQuestion();
            }

        })
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
    livePlayAutoAdvance = false;
    livePlayAutoTransitionCounter = 0;

    /**
     * count down (in seconds) for liveplay
     * @param val
     */
    set countDown(val) {
        this._countDown = val;
        this.timer.resetCountdownTimer(this._countDown);
        this.requestUpdate('countDown');
    }

    handleTimerDropdown(event) {
        switch (event.target.value) {
            case 'no-timer':
                this.countDown = -1;
                break;

            case 'smart-advance':
                this.countDown = -1;
                break;

            default:
                this.countDown = Number(event.target.value);
                break;
        }
    }

    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);

        if (this.timer.remainingTime === 0) {
            this.goNextQuestion();
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
                this.goNextQuestion();
                return;
            }
        });
        InputsController.addListener( (data) => {
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
            this.score.incrementLivePlayNotes(this.currentQuestion.chord, data.input);
            if (this.livePlayAutoAdvance) {
                const isLikeLastQuestion = this.practiceset.previewLastQuestion().hasCommonality(InputsController.notes);
                const isLikeNextQuestion = this.practiceset.previewNextQuestion().hasCommonality(InputsController.notes);
                const isLikeCurrentQuestion = this.currentQuestion.hasCommonality(InputsController.notes);
                if (isLikeNextQuestion && !isLikeLastQuestion) {
                    // there is commonality with the next question, but not the last one. We may be trying to transition
                    this.livePlayAutoTransitionCounter++;
                    if (this.livePlayAutoTransitionCounter > FlashCard.NOTES_TO_AUTOMATICALLY_TRANSITION) {
                        this.goNextQuestion();
                    }
                } else if ( (isLikeNextQuestion && isLikeLastQuestion && !isLikeCurrentQuestion) || !isLikeCurrentQuestion ) {
                    // there is commonality with the next and last question, but its not like the current
                    const event = new Event('incorrect', { bubbles: true, composed: true });
                    this.score.incrementIncorrectLivePlayNotes(this.currentQuestion.chord, data.input);
                    this.dispatchEvent(event);
                }
            } else {
                const correct = this.currentQuestion.isCorrect(InputsController.notes);
                if (correct === false) {
                    const event = new Event('incorrect', { bubbles: true, composed: true });
                    this.score.incrementIncorrectLivePlayNotes(this.currentQuestion.chord, data.input);
                    this.dispatchEvent(event);
                }
            }
        }
    }

    onQuizListener() {
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
            this.goNextQuestion();
            this.transition = false;
        }, 3500);
    }

    resetTimer() {
        if (this.mode === App.LIVEPLAY_MODE) {
            this.timer.resetCountdownTimer(this._countDown);
        } else {
            this.timer.resetQuestionTimer();
        }
    }

    goNextQuestion() {
        this.resetTimer();
        this.currentQuestion = this.practiceset.goNext(
            this.mode === App.LIVEPLAY_MODE ? true : false);
    }

    goCurrentQuestion() {
        this.resetTimer();
        this.currentQuestion = this.practiceset.goCurrent(
            this.mode === App.LIVEPLAY_MODE ? true : false);
    }

    render() {
        return template(this);
    }
}

customElements.define('bsharp-flashcard', FlashCard);
