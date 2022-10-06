import { html, svg } from 'lit';

// edit by AlePio from https://thenounproject.com/browse/icons/term/edit/ Noun Project
const editIcon = svg`<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
 <path d="m526.82 199.31-96.156-96.156-257.48 257.53v96.156h96.156zm-96.133-45.918 45.922 45.922-19.273 19.297-45.922-45.922zm-44.402 44.402 45.922 45.922-152.49 152.48-45.918-45.941zm-177.59 223.51v-45.922l45.922 45.922z"/>
</svg>`;

export const template = (scope) => {
    return html`
        <div id="playlist">
            ${scope.songsController.list.map(song => html`
                <div class="song" @click=${() => scope.playSong(song.id)}>
                    <span>${song.name}</span>
                    <button class="edit" @click=${(e) => {
                        scope.openSong(song.id);
                        e.stopPropagation();
                    }}>${editIcon}</button>    
                    <button class="delete" 
                        @click=${(e) => {
                            const answer = window.confirm('Delete song?');
                            if (answer) {
                                scope.songsController.removeByID(song.id);
                            }
                            e.stopPropagation();
                        }}>x</button></div>`)}
                </div>
                <br />
                <p class="tiny-text">Click to play a song or...</p>
                <button @click=${scope.handleAddNew}>Add New Song</button>`;
}
