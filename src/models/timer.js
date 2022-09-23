export class TimerController {
    static hosts = [];

    static questionTimer = '00:00';

    static sessionTimer = '00:00';

    static questionStartTime = 0;

    static sessionStartTime = 0;

    static timer = -1;

    host;

    constructor(host) {
        (this.host = host).addController(this);
        TimerController.hosts.push(host);
    }

    start() {
        this.resetSessionTimer();
        this.resetQuestionTimer();
        TimerController.timer = setInterval( () => {
            this.refreshTime();
        }, 1000);
    }

    refreshTime() {
        const elapsedQuestionTime = Date.now() - TimerController.questionStartTime;
        const elapsedSessionTime = Date.now() - TimerController.sessionStartTime;
        TimerController.questionTimer = this.formatTime(elapsedQuestionTime);
        TimerController.sessionTimer = this.formatTime(elapsedSessionTime);
        TimerController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    resetQuestionTimer() {
        TimerController.questionStartTime = Date.now();
        this.refreshTime();
    }

    resetSessionTimer() {
        TimerController.sessionStartTime = Date.now();
        this.refreshTime();
    }

    stop() {
        clearInterval(TimerController.timer);
    }

    formatTime(ms) {
        if (ms === Infinity) {
            return 'no timer'
        }
        const ttlSeconds = ms / 1000;
        const seconds = Math.floor(ttlSeconds % 60);
        const secondsAsString = seconds < 10 ? '0' + seconds : seconds;
        const minutes = Math.floor(ms / 1000 / 60);
        const minutesAsString = minutes < 10 ? '0' + minutes : minutes;
        return `${minutesAsString}:${secondsAsString}`;
    }

    get elapsedQuestionTime() {
        return TimerController.questionTimer;
    }

    get elapsedSessionTime() {
        return TimerController.sessionTimer;
    }

    hostConnected() {
        this.host.requestUpdate();
    }
}
