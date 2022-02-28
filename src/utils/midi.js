import { Note } from '../musictheory/note';

export class MidiController {
    static hosts = [];

    static midi = undefined;

    static noteListeners = [];

    static inputs = [];

    static notes = [];

    constructor(host) {
        host.addController(this);
        MidiController.hosts.push(host);
        if (!MidiController.midi) {
            this.refreshConnection();
        }
    }

    refreshConnection() {
        navigator.requestMIDIAccess().then( midi => {
            MidiController.midi = midi;

            MidiController.inputs = [];
            MidiController.inputs = Array.from(midi.inputs.values());
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
        MidiController.noteListeners.push(callback);
    }

    static addListener(callback) {
        MidiController.noteListeners.push(callback);
    }

    chooseInput(id) {
        if (MidiController.midi) {
            MidiController.midi.inputs.forEach(item => {
                if (item.id === id) {
                    item.onmidimessage = (event) => {
                        const data = event.data;
                        const type = data[0] & 0xf0;
                        const note = data[1];
                        const notation = [ ...Note.sharpNotations, ...Note.sharpNotations][(note % Note.sharpNotations.length) + 3];
                        const octave = Math.floor(note / Note.sharpNotations.length) - 1;
                        const velocity = data[2];

                        const notedata = { note: notation, octave, velocity }
                        const indx = MidiController.notes.indexOf(notation + octave);
                        switch (type) {
                            case 144: // noteOn message
                                notedata.type = 'on';
                                if (indx === -1) {
                                    MidiController.notes.push(notation + octave);
                                }
                                break;
                            case 128: // noteOff message
                                notedata.type = 'off';
                                if (indx !== -1) {
                                    MidiController.notes.splice(indx, 1);
                                }
                                break;
                        }

                        if (notedata.type) {
                            MidiController.noteListeners.forEach(cb => cb(notedata));
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
