import { LitElement } from 'lit';
import { template } from './theoryoptions.html.js';
import { styles } from './theoryoptions.css.js';
import { PracticeSetsController } from '../../../models/practicesets.js';

export class TheoryOptions extends LitElement {
    static get styles() { return [ styles ] }

    sets = new PracticeSetsController(this);

    constructor() {
        super();
    }

    render() {
        return template(this);
    }
}

customElements.define('bsharp-theoryoptions-panel', TheoryOptions);
