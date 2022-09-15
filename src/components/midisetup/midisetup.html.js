import { html } from 'lit';

export const template = (scope) => {
    if (scope.midi.inputs.length === 0) {
        return html`<span>Please connect a midi device <i>(works in Chrome/Edge only)</i></span>
        <br />
        <button @click=${scope.handleMidiRefresh}>refresh</button>`;
    }

    return html`
        <strong>Current: ${scope.midi.currentTrigger}</strong>
        <span>Click to set a key to trigger the next question</span>
        <br />
        <button @click=${scope.learnTrigger}>learn trigger</button>
        <br />
        <ul>${scope.midi.inputs.map(input => 
        html`<li @click=${scope.handleInputClick} data-id=${input.id} class=${input.connection}>${input.name}</li>`)}
        </ul>
    <br />
    <button @click=${scope.handleMidiRefresh}>refresh</button>`;
}
