import { html } from 'lit';
import 'piano-keys-webcomponent-v0';
import '../flashcard';
import '../score';
import '../sidepanel';

export const template = (scope) => {
    return html`
        <krill-sidepanel 
                ?started=${scope.started} 
                @start=${scope.handleStartClick}
                @stop=${scope.handleStopClick}
        ></krill-sidepanel>
        <div>
            <krill-flashcard ?started=${scope.started} @playModeChange=${scope.handlePlayModeChange}></krill-flashcard>
            <piano-keys layout="C" keys=61></piano-keys>
            <krill-score></krill-score>
        </div>`;
}
