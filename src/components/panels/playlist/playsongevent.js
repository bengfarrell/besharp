export class PlaySongEvent extends Event {
    static EVENT_TYPE = 'onPlaySong';

    constructor(guid, initObj) {
        super(PlaySongEvent.EVENT_TYPE, initObj);
        this.guid = guid;
    }
}