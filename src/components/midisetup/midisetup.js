import { LitElement } from 'lit';
import { template } from './midisetup.html';
import { styles } from './midisetup.css';
import { styles as button } from '../style/button.css';
import { MidiController } from '../../utils/midi.js';

export class MidiSetup extends LitElement {
    static get styles() { return [ styles, button ] }

    midi = new MidiController(this);

    render() {
        return template(this);
    }

    handleMidiRefresh() {
        this.midi.refreshConnection();
    }

    handleInputClick(event) {
        this.midi.chooseInput(event.target.dataset.id);
    }
}

customElements.define('krill-midisetup', MidiSetup);
