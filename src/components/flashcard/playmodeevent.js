export class PlayModeEvent extends Event {
    static get eventType() { return 'playModeChange'; }

    constructor(opts) {
        super(PlayModeEvent.eventType, opts);
        this.attempt = opts.attempt;
        this.answer = opts.answer;
        this.playing = opts.playing;
    }
}
