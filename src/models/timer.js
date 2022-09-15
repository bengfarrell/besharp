export class TimerController {
    static hosts = [];

    static questionTimer = '00:00';

    static sessionTimer = '00:00';

    static questionStartTime = 0;

    static sessionStartTime = 0;

    static countDownStart = 0;

    static countDownCurrent = -1;

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

        if (TimerController.countDownStart && TimerController.countDownStart !== Infinity) {
            TimerController.countDownCurrent = Math.max(TimerController.countDownStart - elapsedQuestionTime, 0);
            TimerController.questionTimer = this.formatTime(TimerController.countDownCurrent);
        } else if (TimerController.countDownStart === Infinity) {
            TimerController.countDownCurrent = Infinity;
        } else {
            TimerController.questionTimer = this.formatTime(elapsedQuestionTime);
        }
        TimerController.sessionTimer = this.formatTime(elapsedSessionTime);
        TimerController.hosts.forEach(host => {
            host.requestUpdate();
        })
    }

    resetQuestionTimer() {
        TimerController.questionStartTime = Date.now();
        TimerController.countDownStart = 0;
        this.refreshTime();
    }

    resetCountdownTimer(countdown) {
        TimerController.questionStartTime = Date.now();
        if (countdown === -1) {
            TimerController.countDownStart = Infinity;
        } else {
            TimerController.countDownStart = countdown * 1000;
        }
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

    get remainingTime() {
        return TimerController.countDownCurrent;
    }

    get formattedRemainingTime() {
        return this.formatTime(TimerController.countDownCurrent);
    }

    hostConnected() {
        this.host.requestUpdate();
    }
}
