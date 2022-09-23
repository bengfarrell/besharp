import * as Tone from 'tone';

export class Synth {
    static hosts = [];

    static synth = new Tone.Synth().toDestination();

    static metronomeLoaded = false;

    static metronomeTimerID = undefined;

    static metronomePlayer = new Tone.Player("./assets/woodblock.wav").toDestination();

    static synthTimingDict = {};

    static _BPM = 60;

    static _metronomeInterval = '4n';

    static _metronomeRunning = false;

    static _metronomeSilent = false;

    static listeners = [];

    constructor(host) {
        host.addController(this);
        Synth.hosts.push(host);
    }

    static get now() {
        return Tone.now();
    }

    set metronomeInterval(interval) {
        Synth._metronomeInterval = interval;
        Synth.stopMetronome()
        Synth.startMetronome();
        Synth.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    get metronomeInterval() {
        return Synth._metronomeInterval;
    }

    set BPM(bpm) {
        Synth._BPM = bpm;
        Tone.Transport.bpm.value = Synth._BPM;
        Synth.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    get BPM() {
        return Synth._BPM;
    }

    set isMetronomeSilent(val) {
        Synth._metronomeSilent = val;
    }

    get isMetronomeSilent() {
        return Synth._metronomeSilent;
    }


    get isMetronomeRunning() {
        return Synth._metronomeRunning;
    }

    toggleMetronome() {
        if (Synth._metronomeRunning) {
            this.stopMetronome();
        } else {
            this.startMetronome();
        }
    }

    startMetronome() {
        Synth.startMetronome();
    }

    static startMetronome() {
        if (Synth._metronomeRunning) {
            return;
        }
        Tone.start();
        Synth.metronomeTimerID = Tone.Transport.scheduleRepeat((time) => {
            if (!Synth._metronomeSilent) {
                Synth.metronomePlayer.start(time);
            }
            Synth.listeners.forEach(cb => cb({ type: 'tick' }));
        }, Synth._metronomeInterval);
        Tone.Transport.start();

        Synth._metronomeRunning = true;
        Synth.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    stopMetronome() {
        Synth.stopMetronome();
    }

    static stopMetronome() {
        Synth._metronomeRunning = false;
        Tone.Transport.stop();
        Tone.Transport.clear(Synth.metronomeTimerID);
        Synth.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    static press(notation, octave) {
        const toneTime = Tone.now();
        Synth.synthTimingDict[notation + octave] = toneTime;
        Synth.synth.triggerAttack(`${notation}${octave}`, toneTime);
    }

    static release(notation, octave) {
        Synth.synth.triggerRelease(Synth.synthTimingDict[notation + octave] + .25);
        delete Synth.synthTimingDict[notation + octave];
    }

    static pressAndRelease(notation, octave, duration, time) {
        Synth.synth.triggerAttackRelease(notation + octave, duration, time);
    }

    addListener(callback) {
        Synth.addListener(callback);
    }

    removeListener(callback) {
        Synth.removeListener(callback);
    }

    static addListener(callback) {
        Synth.listeners.push(callback);
    }

    static removeListener(callback) {
        Synth.listeners.splice(Synth.listeners.indexOf(callback), 1);
    }
}

Tone.Transport.bpm.value = Synth._BPM;
Tone.Buffer.onload = function() {
   Synth.metronomeLoaded = true;
};