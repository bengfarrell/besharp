import { LitElement } from 'lit';
import { template } from './score.html';
import { styles } from './score.css';
import { ScoreModelController } from '../../models/score.js';
import { TimerController } from '../../models/timer.js';

export class Score extends LitElement {
    static get styles() { return [ styles ] }

    static properties = {
        mode: { type: String },
    };

    score = new ScoreModelController(this);
    timer = new TimerController(this);

    render() {
        return template(this);
    }

    onIncorrect() {
        this.classList.toggle('incorrect', true);
        setTimeout(() => {
            this.classList.toggle('incorrect', false);
        }, 250);
    }
}

customElements.define('bsharp-score', Score);
