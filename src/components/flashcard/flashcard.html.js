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
                    ${scope.mode === 'liveplay' ? html`
                                <span>Beats per Chord:</span>
                                <input type="number" 
                                       ?disabled=${scope.livePlayTimingMode !== 'timer'} 
                                       @change=${scope.onBeatsPerChordChange} 
                                       value=${scope.livePlayBeatsPerChord} />
                                <select @change=${scope.handleTimerDropdown}>
                                    <option value="timer" ?selected=${scope.livePlayTimingMode==='timer'}>Beat Countdown</option>
                                    <option value="no-timer" ?selected=${scope.livePlayTimingMode==='no-timer'}>No Countdown</option>
                                    <option value="auto-advance" ?selected=${scope.livePlayTimingMode==='auto-advance'}>Auto-detect and advance when I play the next chord</option>
                                </select>
                                <br />
                                <span class="tiny-text">or use the spacebar to advance manually<span>
                                    ${scope.livePlayTimingMode === 'timer' ? html`<h1 id="clock">${scope.livePlayCountdown} / ${scope.livePlayBeatsPerChord}</h1>`: undefined}`
                            : html`<span>Timer:</span><h1 id="clock">${scope.transition ? '00:00' : scope.timer.elapsedQuestionTime}</h1>`}
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
