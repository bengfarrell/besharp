import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export const template = (scope) => {
    return html`
        ${renderOptions(scope, scope.sets.options)}`;
}

const renderOptions = (scope, opts) => {
    return html`${Object.entries(opts).map( (entry) => {
        const classes = { section: entry[1].section };
        return html`
            <div class=${classMap(classes)}>
                ${entry[1].section ? undefined : html`
                <input type="checkbox" 
                       @change=${(event) => {
                           entry[1].value = event.target.checked;
                           scope.sets.save();
                           if (entry[1].refreshSet) {
                               scope.sets.refreshPracticeSet();
                           }
                       }} 
                       ?checked=${entry[1].value} />`}
                <label>${entry[1].label}</label>

                ${entry[1].options ? renderOptions(scope, entry[1].options) : undefined}
            </div>
        `;
    })}`;
}
