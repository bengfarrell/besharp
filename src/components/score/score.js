import { LitElement } from 'lit';
import { template } from './score.html';
import { styles } from './score.css';
import { ScoreModelController } from '../../models/score.js';
import { TimerController } from '../../models/timer.js';

export class Score extends LitElement {
    static get styles() { return [ styles ] }

    score = new ScoreModelController(this);
    timer = new TimerController(this);

    render() {
        return template(this);
    }
}

customElements.define('krill-score', Score);
