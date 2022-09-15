import { html } from 'lit';
import { VoxController } from '../../inputs/vox.js';

export const template = (scope) => {
    return html`<span>Sing the input?</span>
        <canvas width="200" height="50"}></canvas>
        <h3 id="note">${VoxController.note || ' - '}</h3>
        <button @click=${VoxController.toggleMicrophone}>${VoxController.active ? html`stop microphone` : html`start microphone`}</button>`;
}
