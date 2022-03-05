import { html } from 'lit';
export const template = (scope) => {
    if (scope.started && !scope.transition) {
        return html`
            <div class="question-ui" id="play-controls">
                <div class="stats-container" id="question-container">
                    <span>Play the following chord:</span>
                    <h1>${scope.currentQuestion.questionText}</h1>
                </div>
                <div class="stats-container" id="clock-container">
                    <span>Timer:</span>
                    <h1 id="clock">${scope.transition ? '00:00' : scope.timer.elapsedQuestionTime}</h1>
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
