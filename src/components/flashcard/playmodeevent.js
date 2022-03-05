export class PlayModeEvent extends Event {
    static get eventType() { return 'playModeChange'; }

    constructor(opts) {
        super(PlayModeEvent.eventType, opts);
        this.question = opts.question;
        this.playing = opts.playing;
    }
}
