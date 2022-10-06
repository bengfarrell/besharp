import { LitElement } from 'lit';
import { template } from './song.html';
import { styles } from './song.css';
import { styles as button } from '../../style/button.css';
import { styles as type } from '../../style/type.css';
import { SongsController } from '../../../models/songscontroller';

export class Song extends LitElement {
    static get styles() { return [ styles, button, type ] }

    static properties = {
        songName: { type: String },
        chord: { type: String },
        chordMod: { type: String },
        lyrics: { type: String },
        numBeats: { type: Number },
        guid: { type: String },
        editIndex: { type: Number }
    };

    songs = new SongsController(this);

    dragging = undefined;

    songID = undefined;

    constructor() {
        super();
        this.numBeats = 16;
        this.chord = 'C';
        this.chordMod = 'maj';
        this.editIndex = -1;
    }

    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);
        if (_changedProperties.has('guid')) {
            if (this.guid) {
                const song = this.songs.findSong(this.guid);
                this.songName = song.name;
                this.songID = song.id;
            }
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (e.currentTarget === this.dragging.lastOver) {
            return false;
        }
        this.dragging.lastOver = e.currentTarget;

        const dragFromIndex = parseInt(this.dragging.target.dataset.index);
        const dragToIndex = parseInt(e.currentTarget.dataset.index);
        const bars = this.dragging.originalOrder.slice();
        bars.splice(
            dragToIndex, 0,
            bars.splice(dragFromIndex, 1)[0]);
        this.songs.findSong(this.songID).bars = bars;
        this.requestUpdate();
    }

    handleDragEnd(e) {
        e.preventDefault();
        this.dragging = undefined;
        this.songs.save();
    }

    handleDragStart(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', null);
        this.dragging = {
            target: e.currentTarget,
            originalOrder: this.songs.findSong(this.songID).bars.slice()
        };
    }

    copyBar(index) {
        const bar = Object.assign({}, this.songs.findSong(this.songID).bars[index]);
        this.songs.findSong(this.songID).bars.push(bar);
        this.songs.save();
        this.requestUpdate();
        requestAnimationFrame(() => {
            const scrollcontainer = this.shadowRoot.querySelector('#song-line-container');
            scrollcontainer.scrollTo({
                behavior: 'smooth',
                top: scrollcontainer.scrollHeight });
        });
    }

    deleteBar(index) {
        this.songs.findSong(this.songID).bars.splice(index, 1);
        this.songs.save();
        this.requestUpdate();
    }

    addBar() {
        let song = this.songs.findSong(this.songID);
        if (!song) {
            song = this.songs.create();
            song.name = this.songName;
            this.songID = song.id;
        }
        song.bars.push( {
            chord: this.chord + this.chordMod,
            lyrics: this.lyrics,
            numBeats: this.numBeats
        });

        this.songs.save();
        requestAnimationFrame(() => {
            const scrollcontainer = this.shadowRoot.querySelector('#song-line-container');
            scrollcontainer.scrollTo({
                behavior: 'smooth',
                top: scrollcontainer.scrollHeight });
        });
        this.requestUpdate();
    }

    render() {
        return template(this);
    }
}

customElements.define('bsharp-song-panel', Song);
