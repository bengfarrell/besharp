export class ScoreModelController {
    static hosts = [];

    static correctAnswers = 0;

    static incorrectAnswers = 0;

    static voxNotes = 0;

    static keyNotes = 0;

    static voxIncorrectNotes = 0;

    static keyIncorrectNotes = 0;

    host;

    static stats = {
        chords: {},
        liveplay: {}
    }

    constructor(host) {
        const saveSettings = localStorage.getItem('bsharp-stats');
        if (saveSettings) {
            ScoreModelController.stats = JSON.parse(saveSettings);
            console.log('load stats', ScoreModelController.stats)
        }
        (this.host = host).addController(this);
        ScoreModelController.hosts.push(host);
    }

    get correct() {
        return ScoreModelController.correctAnswers;
    }

    get incorrect() {
        return ScoreModelController.incorrectAnswers;
    }

    get livePlayVoxPercent() {
        if (ScoreModelController.voxNotes === 0) {
            return 100;
        }
        return (ScoreModelController.voxNotes - ScoreModelController.voxIncorrectNotes) / ScoreModelController.voxNotes * 100;
    }

    get livePlayKeysPercent() {
        if (ScoreModelController.keyNotes === 0) {
            return 100;
        }
        return (ScoreModelController.keyNotes - ScoreModelController.keyIncorrectNotes) / ScoreModelController.keyNotes * 100;
    }

    get total() {
        return this.incorrect + this.correct;
    }

    incrementLivePlayNotes(chord, input) {
        if (input === 'vox') {
            ScoreModelController.voxNotes ++;
        } else {
            ScoreModelController.keyNotes ++;
        }
        if (!ScoreModelController.stats.liveplay.chords[chord]) {
            ScoreModelController.stats.liveplay.chords[chord] = { totalVox: 0, incorrectVox: 0, totalKeys: 0, incorrectKeys: 0 };
        }
        if (input === 'vox') {
            ScoreModelController.stats.liveplay.chords[chord].totalVox ++;
        } else {
            ScoreModelController.stats.liveplay.chords[chord].totalKeys ++;
        }
    }

    incrementIncorrectLivePlayNotes(chord, input) {
        if (input === 'vox') {
            ScoreModelController.voxIncorrectNotes ++;
        } else {
            ScoreModelController.keyIncorrectNotes ++;
        }
        if (!ScoreModelController.stats.liveplay.chords[chord]) {
            ScoreModelController.stats.liveplay.chords[chord] = { totalVox: 0, incorrectVox: 0, totalKeys: 0, incorrectKeys: 0 };
        }s
        if (input === 'vox') {
            ScoreModelController.stats.liveplay.chords[chord].incorrectVox ++;
        } else {
            ScoreModelController.stats.liveplay.chords[chord].incorrectKeys ++;
        }
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        })
    }

    incrementCorrect(chord, inversion) {
        if (!ScoreModelController.stats.chords[chord.inversionNotation(inversion)]) {
            ScoreModelController.stats.chords[chord.inversionNotation(inversion)] = { incorrect: 0, correct: 0 };
        }
        ScoreModelController.stats.chords[chord.inversionNotation(inversion)].correct ++;
        ScoreModelController.correctAnswers ++;
        ScoreModelController.save();
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        })
    }

    incrementIncorrect(chord, inversion) {
        if (!ScoreModelController.stats.chords[chord.inversionNotation(inversion)]) {
            ScoreModelController.stats.chords[chord.inversionNotation(inversion)] = { incorrect: 0, correct: 0 };
        }
        ScoreModelController.stats.chords[chord.inversionNotation(inversion)].incorrect ++;
        ScoreModelController.incorrectAnswers ++;
        ScoreModelController.save();
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    hostConnected() {
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        })
    }

    save() {
        ScoreModelController.save();
    }

    static save() {
        localStorage.setItem('bsharp-stats', JSON.stringify(ScoreModelController.stats));
    }
}
