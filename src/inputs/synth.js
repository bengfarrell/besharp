import * as Tone from 'tone';


export class Synth {
    static synth = new Tone.Synth().toDestination();

    static synthTimingDict = {};

    static get now() {
        return Tone.now();
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
        Synth.synth.triggerAttackRelease(note, duration, time);
    }
}