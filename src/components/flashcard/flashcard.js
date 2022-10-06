import { LitElement } from 'lit';
import { template } from './flashcard.html';
import { styles } from './flashcard.css';
import { styles as type } from '../style/type.css';
import { Note } from '../../musictheory';
import { PracticeSetsController } from '../../models/practicesets.js';
import { ScoreModelController } from '../../models/score';
import { TimerController } from '../../models/timer';
import { InputsController, Synth } from '../../inputs/index.js';
import { PlayModeEvent } from './playmodeevent';
import { App } from '../app';
import { SongsController } from '../../models/songscontroller.js';

export class FlashCard extends LitElement {
    static get styles() { return [ styles, type ] }

    static NOTES_TO_AUTOMATICALLY_TRANSITION = 5;

    static properties = {
        currentQuestion: { type: String },
        queuedQuestion: { type: String },
        mode: { type: String },
        song: { type: String },
        currentAttempt: { type: Array },
        started: { type: Boolean },
        transition: { type: Boolean, reflect: true },
        livePlayBeatsPerChord: { type: Number },
        livePlayCountdown: { type: Number },
        livePlayTimingMode: { type: String }
    };

    constructor() {
        super();
        this.started = false;
        this.currentQuestion = undefined;

        this.practiceset.addListener((e) => {
            if (e.type === 'setquestion') {
                this.goCurrentQuestion();
            }
        });
        this.synth.addListener(e => {
            if (e.type === 'tick' && this.mode === App.LIVEPLAY_MODE) {
                this.livePlayCountdown --;
                if (this.livePlayCountdown === 0) {
                    this.goNextQuestion();
                }
            }
        })
        this.timer.start();
        this.transition = true;
        this.transitionToNextQuestion();

        this.livePlayBeatsPerChord = 16;
        this.livePlayCountdown = 0;
        this.livePlayTimingMode = 'timer';
    }



    score = new ScoreModelController(this);
    songsController = new SongsController(this);
    timer = new TimerController(this);
    practiceset = new PracticeSetsController(this);
    synth = new Synth(this);
    inputs = new InputsController(this);
    currentAttempt = [];
    livePlayAutoTransitionCounter = 0;

    onBeatsPerChordChange(e) {
        this.livePlayBeatsPerChord = parseInt(e.target.value);
        this.livePlayCountdown = parseInt(e.target.value);
    }

    handleTimerDropdown(event) {
        this.livePlayTimingMode = event.target.value;
        this.livePlayCountdown = this.livePlayBeatsPerChord;
    }

    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);
        if (_changedProperties.has('transition')) {
            this.dispatchEvent(new PlayModeEvent({
                playing: _changedProperties.get('transition'),
                question: this.currentQuestion ? this.currentQuestion : undefined }))
        }

        if (_changedProperties.has('song')) {
            if (this.song) {
                const song = this.songsController.findSong(this.song);

            }
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
            if (this.livePlayTimingMode === 'auto-advance') {
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
        if (this.mode === App.QUIZ_MODE) {
            this.timer.resetQuestionTimer();
        }
    }

    goNextQuestion() {
        this.resetTimer();
        this.currentQuestion = this.practiceset.goNext(
            this.mode === App.LIVEPLAY_MODE ? true : false);
        if (this.practiceset.currentBar.numBeats) {
            this.livePlayCountdown = this.practiceset.currentBar.numBeats;
            this.livePlayBeatsPerChord = this.practiceset.currentBar.numBeats;
        } else {
            this.livePlayCountdown = this.livePlayBeatsPerChord;
        }
    }

    goCurrentQuestion() {
        this.resetTimer();
        this.currentQuestion = this.practiceset.goCurrent(
            this.mode === App.LIVEPLAY_MODE ? true : false);
    }

    render() {
        return template(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.synth.stopMetronome();
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.mode === App.LIVEPLAY_MODE) {
            this.synth.startMetronome();
        }
    }
}

customElements.define('bsharp-flashcard', FlashCard);
