import { LitElement } from 'lit';
import { styles } from './playlist.css';
import { styles as button } from '../../style/button.css';
import { styles as type } from '../../style/type.css';
import { template } from './playlist.html';
import { ModalEvent } from '../../modal/modalevent';
import { SongsController } from '../../../models/songscontroller';
import { PlaySongEvent } from './playsongevent';
import { PracticeSetsController } from '../../../models/practicesets.js';

export class Playlist extends LitElement {
    static get styles() { return [ styles, button, type ] }

    songsController = new SongsController(this);
    practiceSets = new PracticeSetsController(this);

    openSong(guid) {
        const e = new ModalEvent('song', { guid }, ModalEvent.TRIGGER_MODAL_OPEN, { bubbles: true, composed: true });
        this.dispatchEvent(e);
    }

    playSong(guid) {
        this.practiceSets.currentSet = this.songsController.findSong(guid).bars;
        this.practiceSets.currentIndex = Math.min(0, this.practiceSets.currentIndex);
        const e = new PlaySongEvent(guid, { bubbles: true, composed: true });
        this.dispatchEvent(e);
    }

    handleAddNew() {
        const e = new ModalEvent('song', {}, ModalEvent.TRIGGER_MODAL_OPEN, { bubbles: true, composed: true });
        this.dispatchEvent(e);
    }

    render() {
        return template(this);
    }
}

customElements.define('bsharp-playlist-panel', Playlist);
