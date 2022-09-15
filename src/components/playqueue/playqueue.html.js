import { html } from 'lit';

export const template = (scope) => {
    return html`
    <div>
        <h3 id="next">Current Set</h3>
    </div>
    <div id="queue">
        ${scope.practicesets.currentSet.map((chord, index) => 
            html`<span class="chord ${scope.practicesets.currentIndex === index ? 'current' : ''}">${chord}</span>`)}
    </div>
    <hr />
    <h3 id="next">Create a Set</h3>
    <div id="set-generation">
        <button @click=${() => scope.practicesets.generateRandomSet()}>Generate new random set</button>
        <label>or enter your own chords:</label>
        <textarea placeholder="example: C#7 E Gm" @change=${scope.onChangeCustomSet}></textarea>
    </div>`;
}