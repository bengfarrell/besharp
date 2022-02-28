import { LitElement } from 'lit';
import { template } from './theoryoptions.html';
import { styles } from './theoryoptions.css';
import { PracticeSetsController } from '../../models/practicesets.js';

export class TheoryOptions extends LitElement {
    static get styles() { return [ styles ] }

    sets = new PracticeSetsController(this);

    render() {
        return template(this);
    }
}

customElements.define('krill-theoryoptions', TheoryOptions);
