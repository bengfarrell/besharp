import { html } from 'lit';

export const template = (scope) => {
    if (scope.midi.inputs.length === 0) {
        return html`<span>Please connect a midi device</span>
        <button @click=${scope.handleMidiRefresh}>refresh</button>`;
    }

    return html`<ul>${scope.midi.inputs.map(input => 
        html`<li @click=${scope.handleInputClick} data-id=${input.id} class=${input.connection}>${input.name}</li>`)}
        </ul>
    <button @click=${scope.handleMidiRefresh}>refresh</button>`;
}
