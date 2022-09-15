import { html } from 'lit';
import { App } from '../app';

export const template = (scope) => {
    if (scope.mode === App.QUIZ_MODE) {
        return html`
            <div class="stats-container">
                <span>Total Questions</span>
                <h1>${scope.score.total}</h1>
            </div>
            
            <div class="stats-container">
                <span>Correct</span>
                <h1>${scope.score.correct}</h1>
            </div>
    
            <div class="stats-container">
                <span>Incorrect</span>
                <h1>${scope.score.incorrect}</h1>
            </div>
            
            <div class="stats-container">
                <span>Elapsed Play Time:</span>
                <h1 id="clock">${scope.timer.elapsedSessionTime}</h1>
            </div>`;
    } else if (scope.mode === App.LIVEPLAY_MODE) {
        return html`
            <div class="stats-container">
                <span>Incorrect</span>
                <h1>${scope.score.incorrect}</h1>
            </div>

            <div class="stats-container">
                <span>Elapsed Play Time:</span>
                <h1 id="clock">${scope.timer.elapsedSessionTime}</h1>
            </div>`;
    }
}