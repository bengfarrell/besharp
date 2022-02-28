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
        this.currentAttempt = undefined;
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
                attempt: this.currentAttempt?.notes,
                answer: this.currentQuestion ? new Chord(this.currentQuestion).notes : undefined }))
        }
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        MidiController.addListener( (data) => {
            if (this.currentQuestion) {
                const answer = new Chord(this.currentQuestion);
                const nooctave = MidiController.notes.map(note => note.substr(0, note.length - 1));

                let answered = 0;
                nooctave.forEach(note => {
                    if (answer.notes.indexOf(note) !== -1) {
                        answered = -1;
                    }
                });

                if (answered === 0 && nooctave.length === answer.notes.length) {
                    answered = 1;
                }

                switch (answered) {
                    case -1:
                        this.currentAttempt = { notes: nooctave, correct: false };
                        this.onIncorrect();
                        break;

                    case 1:
                        this.currentAttempt = { notes: nooctave, correct: false };
                        this.onCorrect();
                        break;
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'c') {
                const answer = new Chord(this.currentQuestion);
                this.currentAttempt = { notes: answer.notes, correct: true };
                this.onCorrect();
            }
            if (e.key === 'w') {
                this.currentAttempt = { notes: ['C', 'Ab', 'G#'], correct: false };
                this.onIncorrect();
            }
        });
    }

    onCorrect() {
        this.score.incrementCorrect();
        this.transitionToNextQuestion();
    }

    onIncorrect() {
        this.score.incrementIncorrect();
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
