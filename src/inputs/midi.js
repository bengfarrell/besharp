import { Note } from '../musictheory/note';

export class MidiController {
    static hosts = [];

    static midi = undefined;

    static noteListeners = [];

    static inputs = [];

    static notes = [];

    static nextQuestionTrigger = undefined;

    constructor(host) {
        host.addController(this);
        MidiController.hosts.push(host);
        if (!MidiController.midi) {
            this.refreshConnection();
        }
    }

    set currentTrigger(notation) {
        MidiController.nextQuestionTrigger = notation;
        MidiController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    get currentTrigger() {
        return MidiController.nextQuestionTrigger;
    }

    refreshConnection() {
        navigator.requestMIDIAccess().then( midi => {
            MidiController.midi = midi;

            MidiController.inputs = [];
            MidiController.inputs = Array.from(midi.inputs.values());
            if (MidiController.inputs.length > 0) {
                this.chooseInput((MidiController.inputs[0].id));
            }
            MidiController.hosts.forEach(host => {
                host.requestUpdate();
            });
        }, (errmsg) => {
            console.warn('Failed to get MIDI access - ' + errmsg );
        } );
    }

    get inputs() {
        if (MidiController.midi) {
            return MidiController.inputs;
        }
        return [];
    }

    addListener(callback) {
        MidiController.addListener(callback);
    }

    removeListener(callback) {
        MidiController.removeListener(callback);
    }

    static addListener(callback) {
        MidiController.noteListeners.push(callback);
    }

    static removeListener(callback) {
        MidiController.noteListeners.splice(MidiController.noteListeners.indexOf(callback), 1);
    }

    static onNoteDown(notation, octave) {
        const indx = MidiController.notes.indexOf(notation + octave);
        if (indx === -1) {
            MidiController.notes.push(notation + octave);
            MidiController.notes = Note.sort(MidiController.notes);
            MidiController.noteListeners.forEach(cb => cb({ type: 'down', note: notation, octave }));
        }
    }

    static onNoteUp(notation, octave) {
        const indx = MidiController.notes.indexOf(notation + octave);
        if (indx !== -1) {
            MidiController.notes.splice(indx, 1);
            MidiController.notes = Note.sort(MidiController.notes);
            MidiController.noteListeners.forEach(cb => cb({ type: 'up', note: notation, octave }));
        }
    }

    chooseInput(id) {
        if (MidiController.midi) {
            MidiController.midi.inputs.forEach(item => {
                if (item.id === id) {
                    item.onmidimessage = (event) => {
                        const data = event.data;
                        const type = data[0] & 0xf0;
                        const note = data[1];
                        const notation = [ ...Note.sharpNotations, ...Note.sharpNotations][(note % Note.sharpNotations.length)];
                        const octave = Math.floor(note / Note.sharpNotations.length) - 1;
                        // const velocity = data[2];
                        switch (type) {
                            case 144: // noteOn message
                                data.type = 'on';
                                MidiController.onNoteDown(notation, octave)
                                break;
                            case 128: // noteOff message
                                data.type = 'off';
                                MidiController.onNoteUp(notation, octave)
                                break;
                        }
                    };

                    // put a bit of a delay so the input object has a chance to say
                    // it's connected before we refresh the components
                    requestAnimationFrame( () => {
                        MidiController.hosts.forEach(host => {
                            host.requestUpdate();
                        });
                    })
                }
            });

            MidiController.hosts.forEach(host => {
                host.requestUpdate();
            });
        }
    }

    hostConnected() {
        MidiController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }
}
