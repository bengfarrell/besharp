import { LitElement } from 'lit';
import { template } from './app.html';
import { styles } from './app.css';
import { Chord, Note } from '../../musictheory';
import { MidiController } from '../../utils/midi.js';

export class App extends LitElement {
    static get styles() { return [ styles ] }

    static properties = {
        started: { type: Boolean }
    };

    constructor() {
        super();
        this.started = false;
        this.disableMIDI = false;
        this.notes = [];
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._pianoEl = this.shadowRoot.querySelector('piano-keys');
        MidiController.addListener(data => this.handleMidi(data));
    }

    handleStartClick() {
        this.started = true;
    }

    handleStopClick() {
        this.started = false;
        this.clearNotes();
    }

    handleMidi(data) {
        if (this.disableMIDI) {
            return;
        }

        if (data.type === 'on') {
            this._pianoEl.setNoteDown(data.note, data.octave);
        } else if (data.type === 'off') {
            this._pianoEl.setNoteUp(data.note, data.octave);
        }
        this.notes = MidiController.notes;
    }

    handlePlayModeChange(e) {
        this.disableMIDI = !e.playing;
        this.clearNotes();

        if (!e.playing && e.answer) {
            e.answer.forEach(note => {
                this._pianoEl.setNoteDown(note, 4);
            });
            this.notes = e.answer.map(note => note + '4');
        }
    }

    clearNotes() {
        this.notes.forEach(note => {
            this._pianoEl.setNoteUp(note.substr(0, note.length-1), note.charAt(note.length-1));
        });
        this.notes = [];
    }

    render() {
        return template(this);
    }
}

customElements.define('krill-app', App);
