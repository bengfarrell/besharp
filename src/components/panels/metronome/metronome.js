import { LitElement } from 'lit';
import { template } from './metronome.html.js';
import { styles } from './metronome.css.js';
// import { styles as button } from '../../style/button.css';
// import { styles as type } from '../../style/type.css'
import { Synth } from '../../../inputs/synth';

export class Metronome extends LitElement {
    static get styles() { return [ styles, /* button, type */ ] }

    synth = new Synth(this);

    render() {
        return template(this);
    }
}

customElements.define('bsharp-metronome-panel', Metronome);
