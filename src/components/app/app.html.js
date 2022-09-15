import { html } from 'lit';
import 'piano-keys-webcomponent-v0';
import '../flashcard';
import '../score';
import '../sidepanel';
import '../playqueue';
import { App } from './app.js';
import { VirtualKeyboardController } from '../../inputs/index.js';

export const template = (scope) => {
    return html`
        <bsharp-sidepanel 
                ?started=${scope.started} 
                @start=${scope.handleStartClick}
                @stop=${scope.handleStopClick}>
        </bsharp-sidepanel>
        <div id="main-container">
            ${scope.mode !== App.NO_MODE ? 
                    html`<bsharp-flashcard 
                            ?started=${scope.started}
                            mode=${scope.mode}
                            @incorrect=${scope.onIncorrect}
                            @playModeChange=${scope.handlePlayModeChange}>
                        </bsharp-flashcard>` 
                    : 
                    html`<div id="no-mode-header"><p>Quizzes are flash card drill style questions, where you must answer the correct chord.</p>
                    <p>Live play sessions emulate playing a song where you must transition from chord to chord and improvise on the spot.</p></div>` }
            <piano-keys layout="C" keys=61 
                        @note-down=${(e) => VirtualKeyboardController.onNoteDown(e.detail.note, e.detail.octave)} 
                        @note-up=${(e) => VirtualKeyboardController.onNoteUp(e.detail.note, e.detail.octave)}>
            </piano-keys>
            <bsharp-playqueue></bsharp-playqueue>
            ${scope.mode !== App.NO_MODE ?
        html`<bsharp-score mode=${scope.mode}></bsharp-score>` : undefined}
        </div>`;
}
