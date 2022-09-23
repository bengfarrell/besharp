import { LitElement } from 'lit';
import { template } from './midisetup.html.js';
import { styles } from './midisetup.css.js';
import { styles as button } from '../../style/button.css.js';
import { MidiController } from '../../../inputs/midi.js';

export class MidiSetup extends LitElement {
    static get styles() { return [ styles, button ] }

    midi = new MidiController(this);

    render() {
        return template(this);
    }

    learnTrigger() {
        const temporaryNoteListener = (data) => {
            if (data.type === 'down') {
                this.midi.currentTrigger = data.note + data.octave;
                this.midi.removeListener(temporaryNoteListener);
            }
        };
        this.midi.addListener(temporaryNoteListener);
    }

    handleMidiRefresh() {
        this.midi.refreshConnection();
    }

    handleInputClick(event) {
        this.midi.chooseInput(event.target.dataset.id);
    }
}

customElements.define('bsharp-midisetup-panel', MidiSetup);
