import { Note } from '../musictheory/note';
import * as Tone from 'tone';

export class VirtualKeyboardController {
    static hosts = [];

    static noteListeners = [];

    static inputs = [];

    static notes = [];

    static synth = new Tone.Synth().toDestination();

    static synthTimingDict = {};

    constructor(host) {
        host.addController(this);
        VirtualKeyboardController.hosts.push(host);
    }

    addListener(callback) {
        VirtualKeyboardController.addListener(callback);
    }

    static addListener(callback) {
        VirtualKeyboardController.noteListeners.push(callback);
    }

    static onNoteDown(notation, octave) {
        const indx = VirtualKeyboardController.notes.indexOf(notation + octave);
        if (indx === -1) {
            VirtualKeyboardController.notes.push(notation + octave);
            VirtualKeyboardController.notes = Note.sort(VirtualKeyboardController.notes);
            VirtualKeyboardController.synthTimingDict[notation + octave] = Tone.now();
            VirtualKeyboardController.synth.triggerAttack(`${notation}${octave}`, VirtualKeyboardController.toneTime);
            VirtualKeyboardController.noteListeners.forEach(cb => cb({ type: 'down', note: notation, octave }));
            VirtualKeyboardController.hosts.forEach(host => {
                host.requestUpdate();
            });
        }
    }

    static onNoteUp(notation, octave) {
        const indx = VirtualKeyboardController.notes.indexOf(notation + octave);
        if (indx !== -1) {
            VirtualKeyboardController.notes.splice(indx, 1);
            VirtualKeyboardController.notes = Note.sort(VirtualKeyboardController.notes);
            VirtualKeyboardController.synth.triggerRelease(VirtualKeyboardController.synthTimingDict[notation + octave] + .25);
            delete VirtualKeyboardController.synthTimingDict[notation + octave];
            VirtualKeyboardController.noteListeners.forEach(cb => cb({ type: 'up', note: notation, octave }));
            VirtualKeyboardController.hosts.forEach(host => {
                host.requestUpdate();
            });
        }
    }

    hostConnected() {
        VirtualKeyboardController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }
}
