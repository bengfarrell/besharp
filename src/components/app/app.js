import { LitElement } from 'lit';
import { template } from './app.html';
import { styles } from './app.css';
// import { styles as colors } from '../style/colors.css';
import { Chord } from '../../musictheory';
import { InputsController, Synth } from '../../inputs/index';
import { ModalEvent } from '../modal/modalevent';
import { PlaySongEvent } from '../panels/playlist/playsongevent';

export class App extends LitElement {
    static LIVEPLAY_MODE = 'liveplay';

    static QUIZ_MODE = 'quiz';

    static NO_MODE = 'none';

    static get styles() { return [ styles, /* colors */ ] }

    static properties = {
        started: { type: Boolean },
        mode: { type: String },
        song: { type: String },
        currentModal: { type: String }
    };

    inputs = new InputsController(this);

    constructor() {
        super();
        this.started = false;
        this.mode = App.NO_MODE;
        this.disableInput = false;
        this.notes = [];
        this.currentModal = undefined;
        this.currentModalOptions = undefined;
        this.addEventListener(ModalEvent.TRIGGER_MODAL_OPEN, e => {
            this.currentModal = e.modalName;
            this.currentModalOptions = e.options;
        });
        this.addEventListener(ModalEvent.TRIGGER_MODAL_CLOSE, e => {
            this.currentModal = undefined;
            this.currentModalOptions = undefined;
        });
        this.addEventListener(PlaySongEvent.EVENT_TYPE, e => {
            this.song = e.guid;
            this.mode = App.LIVEPLAY_MODE;
            this.started = true;
        })
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._pianoEl = this.shadowRoot.querySelector('piano-keys');
        InputsController.addListener(this.handleInput.bind(this));
    }

    handleStartClick(event) {
        this.mode = event.target.mode;
        this.started = true;
    }

    handleStopClick() {
        this.mode = App.NO_MODE;
        this.started = false;
        this.clearNotes();
    }

    handleInput(data) {
        if (this.disableInput) {
            return;
        }
        if (data.type === 'down') {
            this._pianoEl.setNoteDown(data.note, data.octave);
        } else if (data.type === 'up') {
            this._pianoEl.setNoteUp(data.note, data.octave);
        }
        this.notes = InputsController.notes;
    }

    handlePlayModeChange(e) {
        setTimeout(() => {
            // allow the last note to release (esp if using the synth)
            this.disableInput = !e.playing;
            this.clearNotes();

            if (!e.playing && e.question) {
                const answerWithSampleOctave = new Chord(e.question.chord.notation, 4).inversion(e.question.inversion);
                const time = Synth.now;
                answerWithSampleOctave.forEach((note, index) => {
                    const notation = note.substring(0, note.length-1);
                    const octave = note.charAt(note.length-1);
                    Synth.pressAndRelease(notation, octave, '128t', time + index / 2);
                    this._pianoEl.setNoteDown(notation, octave);
                });
                this.notes = answerWithSampleOctave;
            }
            setTimeout(() => {
                // now allow the notes that are shown to properly release before clearing
                this.clearNotes();
            }, 1000);
        }, 1000);
    }

    clearNotes() {
        this.notes.forEach(note => {
            this._pianoEl.setNoteUp(note.substr(0, note.length-1), note.charAt(note.length-1));
        });
        this.notes = [];
    }

    onIncorrect() {
        const score = this.shadowRoot.querySelector('bsharp-score');
        if (score) {
            this.shadowRoot.querySelector('bsharp-score').onIncorrect();
        }
    }

    render() {
        return template(this);
    }
}

customElements.define('bsharp-app', App);
