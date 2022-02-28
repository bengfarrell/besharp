import { html } from 'lit';

export const template = (scope) => {
    return html`
        <h4>Chords to Allow</h4>
        ${Object.entries(scope.sets.options).map( (entry) => {
            return html`<div>
                <input type="checkbox" @change=${(event) => {scope.sets.updateOption(entry[0], event.target.checked)}} ?checked=${entry[1].value} />
                <label>${entry[1].label}</label>
            </div>`;
        })}`;
}
