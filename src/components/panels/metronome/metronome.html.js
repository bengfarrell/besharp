import { html } from 'lit';

const timeSubdivisions = ["1m", "1n", "1n.", "2n", "2n.", "2t", "4n",  "4n.",  "4t", "8n", "8n.", "8t",
    "16n", "16n.", "16t", "32n", "32n.", "32t", "64n", "64n.", "64t", "128n", "128n.", "128t",
    "256n", "256n.", "256t" ];

export const template = (scope) => {
    return html`
    <label>Beats per Minute</label>
    <input type="number" 
           value=${scope.synth.BPM} 
           @input=${(e) => scope.synth.BPM = parseInt(e.target.value)} />
    
    <br />
    <label>Timing</label>
    <select @change=${(event) => scope.synth.metronomeInterval = event.target.value}>
        ${timeSubdivisions.map(t => html`<option value=${t}>${t}</option>`)}
    </select>

    <br />
    
    <div>
        <label>Silent?</label>
        <input type="checkbox" ?checked=${scope.synth.isMetronomeSilent} @change=${(event) => scope.synth.isMetronomeSilent = event.target.checked} />
    </div>
    <span class="tiny-text">Metronome timing will still be used for live playback even if silent</span>

    <br />
    <button @click=${() => scope.synth.toggleMetronome()}>${scope.synth.isMetronomeRunning ? 'Stop' : 'Start'}</button>`;
}
