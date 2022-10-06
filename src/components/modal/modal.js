import { LitElement } from 'lit';
import { styles } from './modal.css';
import { styles as button } from '../style/button.css';
import { styles as type } from '../style/type.css';
import { template } from './modal.html';
import { ModalEvent } from './modalevent';

export class Modal extends LitElement {
    static get styles() { return [ styles, button, type ] }

    static properties = {
        modal: { type: String },
    };

    render() {
        return template(this);
    }

    triggerClose() {
        const e = new ModalEvent(this.modal, {}, ModalEvent.TRIGGER_MODAL_CLOSE, { bubbles: true, composed: true });
        this.dispatchEvent(e);
    }
}

customElements.define('bsharp-modal', Modal);