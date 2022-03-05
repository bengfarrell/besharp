export class ScoreModelController {
    static hosts = [];

    static correctAnswers = 0;

    static incorrectAnswers = 0;

    host;

    static stats = {
        chords: {}
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

    get total() {
        return this.incorrect + this.correct;
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
