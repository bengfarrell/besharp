import { LitElement } from 'lit';
import { template } from './sidepanel.html';
import { styles } from './sidepanel.css';
import { styles as button } from '../style/button.css';
import { START_EVENT, STOP_EVENT } from './index.js';

export class SidePanel extends LitElement {
    static get styles() { return [ styles, button ] }

    static properties = {
        started: { type: Boolean }
    };

    render() {
        return template(this);
    }

    handleStartClick() {
        if (this.started) {
            this.dispatchEvent(new Event(STOP_EVENT, { bubbles: true, composed: true }));
        } else {
            this.dispatchEvent(new Event(START_EVENT, { bubbles: true, composed: true }));
        }
    }
}

customElements.define('krill-sidepanel', SidePanel);
