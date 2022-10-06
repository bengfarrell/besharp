import { html } from 'lit';
import '../panels/midisetup';
import '../panels/micsetup';
import '../panels/theoryoptions';
import '../panels/metronome';
import '../panels/playlist';
import { App } from '../app/index.js';

const panels = [
    {
        id: 1,
        name: 'MIDI Options',
        el: html`<bsharp-midisetup-panel></bsharp-midisetup-panel>`,
        open: false,
    },
    {
        id: 2,
        name: 'Microphone Input',
        el: html`<bsharp-micsetup-panel></bsharp-micsetup-panel>`,
        open: false,
    },
    {
        id: 3,
        name: 'Music Theory',
        el: html`<bsharp-theoryoptions-panel></bsharp-theoryoptions-panel>`,
        open: false,
    },
    {
        id: 4,
        name: 'Metronome',
        el: html`<bsharp-metronome-panel></bsharp-metronome-panel>`,
        open: false,
    },
    {
        id: 5,
        name: 'My Playlist',
        el: html`<bsharp-playlist-panel></bsharp-playlist-panel>`,
        open: false,
    }
]

export const template = (scope) => {
    return html`
        <div class="padded-container">
            <h1 id="logo">Be#Sharp</h1>
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
                <div class="panel-header" @click=${() => scope.togglePanel(panel)}>
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
