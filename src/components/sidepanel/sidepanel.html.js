import { html } from 'lit';
import '../midisetup';
import '../micsetup';
import '../theoryoptions';
import { App } from '../app/index.js';

const panels = [
    {
        id: 1,
        name: 'MIDI Options',
        el: html`<bsharp-midisetup></bsharp-midisetup>`,
        open: true,
    },
    {
        id: 2,
        name: 'Microphone Input',
        el: html`<bsharp-micsetup></bsharp-micsetup>`,
        open: true,
    },
    {
        id: 3,
        name: 'Music Theory',
        el: html`<bsharp-theoryoptions></bsharp-theoryoptions>`,
        open: false,
    }
]

export const template = (scope) => {
    return html`
        <div class="padded-container">
            <h1>Be#Sharp</h1>
            <div class="button-container">
                ${scope.started ? html`<button class="large" @click=${scope.handleStopClick}>Stop</button>` : html`
                    <button class="large" @click=${() => scope.handleStartClick(App.QUIZ_MODE)}>Start Quiz</button>
                </button>
                <button class="large" @click=${() => scope.handleStartClick(App.LIVEPLAY_MODE)}>Start Live</button>`}
            </div>
        </div>
        <div class="separator"></div>
        <div class="panels-container padded-container">
        ${panels.map((panel) => html`
            <div class="panel ${panel.open ? 'open': ''}">
                <div class="panel-header">
                    <span>${panel.name}</span>
                    <button class="toggle-open invisible" @click=${() => scope.togglePanel(panel)}>
                        <span></span>
                    </button>
                </div>
                <div class="panel-content">
                    ${panel.el}
                </div>
            </div>
        `)}
        </div>`;
}
