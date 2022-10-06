import { html } from 'lit';
export const template = (scope) => {
    return html`
        <div id="click-cover"></div>
        <div id="modal">
            <button @click=${scope.triggerClose}>x</button>
            <slot></slot>
        </div>`;
}
