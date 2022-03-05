import { LitElement } from 'lit';
import { template } from './flashcard.html';
import { styles } from './flashcard.css';
import { Chord } from '../../musictheory';
import { PracticeSetsController } from '../../models/practicesets.js';
import { ScoreModelController } from '../../models/score';
import { TimerController } from '../../models/timer';
import { MidiController } from '../../utils/midi';
import { PlayModeEvent } from './playmodeevent';

export class FlashCard extends LitElement {
    static get styles() { return [ styles ] }

    static properties = {
        currentQuestion: { type: String },
        started: { type: Boolean },
        transition: { type: Boolean, reflect: true },
    };

    constructor() {
        super();
        this.transition = false;
        this.started = false;
        this.currentQuestion = undefined;
    }

    score = new ScoreModelController(this);
    timer = new TimerController(this);
    practiceset = new PracticeSetsController(this);
    midi = new MidiController(this);

    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);

        if (_changedProperties.has('started') && _changedProperties.get('started') === false) {
            this.timer.start();
            this.transitionToNextQuestion();
        }

        if (_changedProperties.has('transition')) {
            this.dispatchEvent(new PlayModeEvent({
                playing: _changedProperties.get('transition'),
                question: this.currentQuestion ? this.currentQuestion : undefined }))
        }
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        MidiController.addListener( (data) => {
            if (this.currentQuestion && !this.transition) {
                const nooctave = MidiController.notes.map(note => note.substr(0, note.length - 1));
                const uniquenooctave = nooctave.filter((v, i, a) => a.indexOf(v) === i);
                const correct = this.currentQuestion.isCorrect(uniquenooctave);
                if (correct === true) {
                    this.onCorrect();
                } else if (correct === false) {
                    this.onIncorrect();
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'c') {
                this.currentQuestion.isCorrect(this.currentQuestion.notes);
                this.onCorrect();
            }
            if (e.key === 'w') {
                this.currentQuestion.isCorrect(['A#', 'B', 'C']);
                this.onIncorrect();
            }
        });
    }

    onCorrect() {
        this.score.incrementCorrect(this.currentQuestion.chord, this.currentQuestion.inversion);
        this.transitionToNextQuestion();
    }

    onIncorrect() {
        this.score.incrementIncorrect(this.currentQuestion.chord, this.currentQuestion.inversion);
        this.transitionToNextQuestion();
    }

    transitionToNextQuestion() {
        this.transition = true;
        setTimeout(() => {
            this.currentQuestion = undefined;
            this.timer.resetQuestionTimer();
            this.nextQuestion();
            this.transition = false;
        }, 3500);
    }

    nextQuestion() {
        this.timer.resetQuestionTimer();
        this.currentQuestion = this.practiceset.next;
    }

    render() {
        return template(this);
    }
}

customElements.define('krill-flashcard', FlashCard);
