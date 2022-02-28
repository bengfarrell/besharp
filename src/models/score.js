export class ScoreModelController {
    static hosts = [];

    static correctAnswers = 0;

    static incorrectAnswers = 0;

    host;

    constructor(host) {
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

    incrementCorrect() {
        ScoreModelController.correctAnswers ++;
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        })
    }

    incrementIncorrect() {
        ScoreModelController.incorrectAnswers ++;
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    hostConnected() {
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        })
    }
}
