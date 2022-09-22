import { html, svg } from 'lit';

// Refresh by Gregor Cresnar from https://thenounproject.com/browse/icons/term/refresh Noun Project
const RefreshIcon = svg`<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="m557.2 98.168c43.57 53.664 65.434 121.72 61.273 190.72-4.1641 68.996-34.047 133.93-83.754 181.96-49.707 48.039-115.62 75.695-184.72 77.5v-67.199c51.242-1.875 100.01-22.5 137.04-57.965 37.035-35.461 59.758-83.285 63.855-134.4 4.0977-51.109-10.719-101.95-41.633-142.85l-60.984 60.984c-3.4141 3.418-8.0469 5.3398-12.879 5.3398-4.832 0-9.4648-1.918-12.879-5.3359-3.4141-3.418-5.3281-8.0547-5.3242-12.887v-157.64c0-6.6836 2.6562-13.09 7.3828-17.816 4.7266-4.7266 11.133-7.3828 17.816-7.3828h157.64c4.832-0.003907 9.4688 1.9102 12.887 5.3242 3.418 3.4141 5.3359 8.0469 5.3359 12.879 0 4.832-1.9219 9.4648-5.3398 12.879zm-470.12 419.55c-3.418 3.4141-5.3398 8.0469-5.3398 12.879 0 4.832 1.918 9.4648 5.3359 12.879 3.418 3.4141 8.0547 5.3281 12.887 5.3242h157.64c6.6836 0 13.09-2.6562 17.816-7.3828 4.7266-4.7266 7.3828-11.133 7.3828-17.816v-157.64c0.003907-4.832-1.9102-9.4688-5.3242-12.887-3.4141-3.418-8.0469-5.3359-12.879-5.3359-4.832 0-9.4648 1.9219-12.879 5.3398l-60.984 60.984c-30.914-40.906-45.73-91.742-41.633-142.85 4.0977-51.113 26.82-98.938 63.855-134.4 37.035-35.465 85.801-56.09 137.04-57.965v-67.199c-69.102 1.8047-135.01 29.461-184.72 77.5-49.707 48.035-79.59 112.97-83.754 181.96-4.1602 69 17.703 137.05 61.273 190.72z"/>
</svg>`;

export const template = (scope) => {
    return html`
    <div id="queue">
        ${scope.practicesets.currentSet.map((chord, index) => 
            html`<span @click=${() => scope.practicesets.currentIndex = index}
                    class="chord ${scope.practicesets.currentIndex === index ? 'current' : ''}">${chord}</span>`)}
        <button class="has-icon" id="refresh" @click=${() => { 
            scope.practicesets.generateRandomSet(); 
            scope.practicesets.currentIndex = 0; 
        }}>${RefreshIcon}</button>
    </div>
    <textarea placeholder="Use your own chords by adding here \rexample: C#7 E Gm" @change=${scope.onChangeCustomSet}></textarea>`;
}