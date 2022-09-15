export * from './midi.js';
export * from './virtualkeyboard.js';
export * from './vox.js';
export * from './synth.js';

import { MidiController } from './midi.js';
import { VoxController } from './vox.js';
import { VirtualKeyboardController } from './virtualkeyboard.js';

export class InputsController {
    static hosts = [];

    static noteListeners = [];

    static inputs = [];

    static notes = [];

    addListener(callback) {
        InputsController.addListener(callback);
    }

    static addListener(callback) {
        InputsController.noteListeners.push(callback);
    }

    constructor(host) {
        host.addController(this);
        InputsController.hosts.push(host);
    }

    static updateNotes(e) {
        InputsController.notes = [ ...new Set([VoxController.note, ...MidiController.notes, ...VirtualKeyboardController.notes]) ]
            .filter(note => note !== undefined)
            .sort();
        InputsController.noteListeners.forEach(cb => cb(e));
        InputsController.updateHosts();
    }

    static updateHosts() {
        InputsController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    hostConnected() {
        InputsController.updateHosts();
    }

}

MidiController.addListener((e) => {
    e.input = 'midi';
    InputsController.updateNotes(e);
});

VoxController.addListener((e) => {
    e.input = 'vox';
    InputsController.updateNotes(e);
});

VirtualKeyboardController.addListener((e) => {
    e.input = 'virtualkeyboard';
    InputsController.updateNotes(e);
});