import { Note } from '../musictheory';

export class PracticeSetsController {
    static hosts = [];

    static options = {
        naturals: {label: 'Naturals', value: true },
        sharps: {label: 'Flats/Sharps', value: false },
        minors: {label: 'Minors', value: false },
        sevenths: {label: 'Sevenths', value: false },
        minorsevenths: {label: 'Minor Sevenths', value: false },
        majorsevenths: {label: 'Major Sevenths', value: false },
        ninths: {label: 'Ninths', value: false },
    };

    static currentSet = [];

    constructor(host) {
        (this.host = host).addController(this);
        PracticeSetsController.hosts.push(host);
    }

    get options() {
        return PracticeSetsController.options;
    }

    get next() {
        if (PracticeSetsController.currentSet.length === 0) {
            this.refreshPracticeSet();
        }
        return PracticeSetsController.currentSet.pop();
    }
    updateOption(key, value) {
        PracticeSetsController.options[key].value = value;
        this.refreshPracticeSet();
    }

    refreshPracticeSet() {
        const pset = [];
        if (this.options['naturals'].value) {
            pset.push(...Note.sharpNotations.filter(note => note.indexOf('#') === -1));
        }
        if (this.options['sharps'].value) {
            pset.push(...Note.sharpNotations.filter(note => note.indexOf('#') !== -1));
        }

        const notes = pset.slice();
        if (this.options['minors'].value) {
            pset.push( ...notes.map(note => note + 'm'));
        }
        if (this.options['sevenths'].value) {
            pset.push( ...notes.map(note => note + '7'));
        }
        if (this.options['minorsevenths'].value) {
            pset.push( ...notes.map(note => note + 'm7'));
        }
        if (this.options['majorsevenths'].value) {
            pset.push( ...notes.map(note => note + 'maj7'));
        }
        if (this.options['ninths'].value) {
            pset.push( ...notes.map(note => note + '9'));
        }

        PracticeSetsController.currentSet = pset.sort((a, b) => 0.5 - Math.random());
        PracticeSetsController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    hostConnected() {
        this.host.requestUpdate();
    }
}
