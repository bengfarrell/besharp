import { LitElement } from 'lit';
import { template } from './sidepanel.html';
import { styles } from './sidepanel.css';
import { styles as button } from '../style/button.css';
import { START_EVENT, STOP_EVENT } from './index';
import { App } from '../app/';
import { TimerController } from '../../models/timer.js';

export class SidePanel extends LitElement {

    mode = App.QUIZ_MODE;
    timer = new TimerController(this);

    static get styles() { return [ styles, button ] }

    static properties = {
        started: { type: Boolean },
        mode: { type: String }
    };

    render() {
        return template(this);
    }

    handleStartClick(mode) {
        this.mode = mode;
        if (this.started) {
            this.dispatchEvent(new Event(STOP_EVENT, { bubbles: true, composed: true }));
        } else {
            this.dispatchEvent(new Event(START_EVENT, { bubbles: true, composed: true }));
        }
    }

    handleStopClick() {
        this.timer.stop();
        this.dispatchEvent(new Event(STOP_EVENT, { bubbles: true, composed: true }));
    }

    togglePanel(panel) {
        panel.open = !panel.open;
        this.requestUpdate();
    }
}

customElements.define('bsharp-sidepanel', SidePanel);
