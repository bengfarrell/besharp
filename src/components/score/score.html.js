import { html } from 'lit';

export const template = (scope) => {
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
            <span>Elapsed Time:</span>
            <h1 id="clock">${scope.timer.elapsedSessionTime}</h1>
        </div>`;
}
