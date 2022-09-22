import { html } from 'lit';

export const template = (scope) => {
    if (scope.started && !scope.transition) {
        return html`
            <div class="question-ui" id="play-controls">
                <div class="stats-container" id="question-container">
                    <span>Play the following chord:</span>
                    <h1>${scope.currentQuestion ? scope.currentQuestion.questionText : ''}</h1>
                    <strong>${scope.currentAttempt.join(', ')}</strong>
                </div>
                
                <div class="stats-container" id="clock-container">
                    <span>Timer:</span>
                    ${scope.mode === 'liveplay' ? html`
                    <select @change=${scope.handleTimerDropdown}>
                        <option value="10">10 seconds</option>
                        <option selected value="15">15 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="45">45 seconds</option>
                        <option value="60">1 minute</option>
                        <option value="90">1m 30s</option>
                        <option value="120">2 minutes</option>
                        <option value="180">3 minutes</option>
                        <option value="300">5 minutes</option>
                        <option value="no-timer">No timer, I want to use the spacebar</option>
                        <option value="smart-advance">Auto-detect and advance when I play the next chord</option>
                    </select><br /><span class="tiny-text">or use the spacebar to advance manually<span>
                    <h1 id="clock">${scope.transition ? '00:00' : scope.timer.formattedRemainingTime}</h1>`
                            : html`<h1 id="clock">${scope.transition ? '00:00' : scope.timer.elapsedQuestionTime}</h1>`}
                </div>
            </div>`;
    } else if (scope.transition) {
        return html`
            <div id="transition-container">
                <div id="progress-bar"></div>
                <div id="transition-messaging">${scope.currentQuestion ? scope.currentQuestion.answerText : 'Let\'s get started...'}</div>
            </div>`;
    } else {
        return html`<span class="question-ui">Click start to begin practicing</span>`;
    }
}
