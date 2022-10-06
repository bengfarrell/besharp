export class SongsController {
    static hosts = [];

    static list = [ {
        id: '_internal_',
        name: 'Baby on Board',
        bars: [
            { numBeats: 8, chord: 'C', lyrics: 'Baby on'},
            { numBeats: 8, chord: 'E7', lyrics: 'board'},
            { numBeats: 8, chord: 'A', lyrics: 'How I\'ve'},
            { numBeats: 8, chord: 'A7', lyrics: 'adored. That'},
            { numBeats: 8, chord: 'Dm', lyrics: 'sign on my'},
            { numBeats: 8, chord: 'A7', lyrics: 'car\'s window'},
            { numBeats: 2, chord: 'Dm', lyrics: 'pa-'},
            { numBeats: 2, chord: 'A7', lyrics: '-aa-'},
            { numBeats: 2, chord: 'Dm', lyrics: '-ne. A'},
            { numBeats: 8, chord: 'G', lyrics: 'bounce in my'},
            { numBeats: 4, chord: 'G7', lyrics: 'step'},
            { numBeats: 8, chord: 'C', lyrics: 'Loaded with'},
            { numBeats: 4, chord: 'A7', lyrics: 'pep. Cause I\'m'},
            { numBeats: 8, chord: 'D', lyrics: 'driving in the'},
            { numBeats: 2, chord: 'D7', lyrics: 'car-'},
            { numBeats: 2, chord: 'D9', lyrics: '-pool'},
            { numBeats: 2, chord: 'G', lyrics: 'la-'},
            { numBeats: 2, chord: 'Gdim', lyrics: '--'},
            { numBeats: 2, chord: 'G7', lyrics: 'ne'},

            { numBeats: 8, chord: 'C', lyrics: 'Call me a'},
            { numBeats: 8, chord: 'E7', lyrics: 'square'},
            { numBeats: 8, chord: 'A', lyrics: 'Friend, I don\'t'},
            { numBeats: 8, chord: 'A7', lyrics: 'care. That'},
            { numBeats: 8, chord: 'Dm', lyrics: 'little yellow'},
            { numBeats: 8, chord: 'A7', lyrics: 'sign can\'t be'},
            { numBeats: 2, chord: 'Dm', lyrics: 'ign--'},
            { numBeats: 2, chord: 'A7', lyrics: '-o-'},
            { numBeats: 2, chord: 'Dm', lyrics: '-red. I\'m telling'},

            { numBeats: 8, chord: 'F', lyrics: 'you it\'s mighty'},
            { numBeats: 8, chord: 'F#dim', lyrics: 'nice. Each trip\'s a'},
            { numBeats: 4, chord: 'C', lyrics: 'trip to'},
            { numBeats: 2, chord: 'B', lyrics: 'pa-'},
            { numBeats: 2, chord: 'Bb', lyrics: '-ra-'},
            { numBeats: 2, chord: 'A', lyrics: '-dise'},

            { numBeats: 4, chord: 'A7', lyrics: 'With my'},
            { numBeats: 2, chord: 'D7', lyrics: 'baby'},
            { numBeats: 2, chord: 'G7', lyrics: '--'},
            { numBeats: 2, chord: 'Gaug', lyrics: 'on'},
            { numBeats: 2, chord: 'C', lyrics: 'board'},
            { numBeats: 2, chord: 'G7', lyrics: '---'},
            { numBeats: 2, chord: 'C', lyrics: '---'},
        ]
    }];

    host;

    constructor(host) {
        (this.host = host).addController(this);
        SongsController.hosts.push(host);
    }

    findSong(id) {
        return SongsController.list.find(song => song.id === id);
    }

    findSongIndex(id) {
        return SongsController.list.findIndex(song => song.id === id);
    }

    removeByID(guid) {
        const indx = this.findSongIndex(guid);
        SongsController.list.splice(indx, 1);
        this.save();
        SongsController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    create() {
        const song = {};
        song.id = crypto.randomUUID();
        song.bars = [];
        SongsController.list.push(song);
        SongsController.hosts.forEach(host => {
            host.requestUpdate();
        });
        this.save();
        return song;
    }

    get list() {
        return SongsController.list;
    }

    hostConnected() {
        this.host.requestUpdate();
    }

    save() {
        SongsController.save();
    }

    static save() {
        localStorage.setItem('bsharp-songs', JSON.stringify(SongsController.list));
    }
}

const savedSongs = localStorage.getItem('bsharp-songs');
if (savedSongs) {
    SongsController.list = JSON.parse(savedSongs);
    console.log('load songs', SongsController.list)
}