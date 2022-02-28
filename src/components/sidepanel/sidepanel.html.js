import { html } from 'lit';
import '../midisetup';
import '../theoryoptions';

export const template = (scope) => {
    return html`
        <button @click=${scope.handleStartClick}>${scope.started ? 'Stop' : 'Start'}</button>
        <krill-midisetup class="section"></krill-midisetup>
        <krill-theoryoptions class="section"></krill-theoryoptions>`;
}
