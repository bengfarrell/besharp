import { html } from 'lit';
import '../midisetup';
import '../theoryoptions';

export const template = (scope) => {
    return html`
        <button @click=${scope.handleStartClick}>${scope.started ? 'Stop' : 'Start'}</button>
        <krill-midisetup class="section"></krill-midisetup>
        <krill-theoryoptions class="section"></krill-theoryoptions>
        <p>Want to try this and don't have a MIDI keyboard?</p>
        <p>For now you can fake (C)orrect or (W)rong answers by hitting the C or W keys.</p>
        <h4>Please use in Chrome/Edge only</h4>`;
}
