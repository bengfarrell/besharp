import { Note, Chord } from '../musictheory';
import { Question } from './question.js';

export class PracticeSetsController {
    static hosts = [];

    static options = {
        chords: {
            label: 'Chords to Allow',
            section: true,
            options: {
                naturals: {label: 'Naturals', value: true, refreshSet: true },
                sharps: {label: 'Flats/Sharps', value: false, refreshSet: true },
                minors: {label: 'Minors', value: false, refreshSet: true },
                sevenths: {label: 'Sevenths', value: false, refreshSet: true },
                minorsevenths: {label: 'Minor Sevenths', value: false, refreshSet: true },
                majorsevenths: {label: 'Major Sevenths', value: false, refreshSet: true },
                ninths: {label: 'Ninths', value: false, refreshSet: true },
            }
        },
        inversions: {
            label: 'Enforce Note Order',
            section: true,
            options: {
                root: { label: 'Root position', value: false },
                first: {label: 'First', value: false },
                second: {label: 'Second', value: false },
                third: {label: 'Third (for 7ths)', value: false },
            }
        }
    };

    static currentSet = PracticeSetsController.generateRandomSet();

    static currentIndex = -1;

    constructor(host) {
        if (host) {
            (this.host = host).addController(this);
            PracticeSetsController.hosts.push(host);
        }
    }

    set currentSet(notations) {
        PracticeSetsController.currentSet = notations;
        PracticeSetsController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    get currentSet() {
        return PracticeSetsController.currentSet;
    }

    get currentIndex() {
        return PracticeSetsController.currentIndex;
    }

    get options() {
        return PracticeSetsController.options;
    }

    get activeInversions() {
        const keys = Object.keys(this.options.inversions.options);
        return keys.filter(key => this.options.inversions.options[key].value);
    }

    next(ignoreInversions) {
        PracticeSetsController.currentIndex ++;
        if (PracticeSetsController.currentIndex > PracticeSetsController.currentSet.length -1) {
            PracticeSetsController.currentIndex = 0;
        }
        const next = PracticeSetsController.currentSet[PracticeSetsController.currentIndex]
        PracticeSetsController.hosts.forEach(host => {
            host.requestUpdate();
        });
        return new Question(next, ignoreInversions ? undefined : this.activeInversions);
    }

    generateRandomSet(count = 10) {
        PracticeSetsController.currentSet = PracticeSetsController.generateRandomSet(count);
        PracticeSetsController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    static generateRandomSet(count = 10) {
        const pset = [];
        if (this.options.chords.options['naturals'].value) {
            pset.push(...Note.sharpNotations.filter(note => note.indexOf('#') === -1));
        }
        if (this.options.chords.options['sharps'].value) {
            pset.push(...Note.sharpNotations.filter(note => note.indexOf('#') !== -1));
        }

        const notes = pset.slice();
        if (this.options.chords.options['minors'].value) {
            pset.push( ...notes.map(note => note + 'm'));
        }
        if (this.options.chords.options['sevenths'].value) {
            pset.push( ...notes.map(note => note + '7'));
        }
        if (this.options.chords.options['minorsevenths'].value) {
            pset.push( ...notes.map(note => note + 'm7'));
        }
        if (this.options.chords.options['majorsevenths'].value) {
            pset.push( ...notes.map(note => note + 'maj7'));
        }
        if (this.options.chords.options['ninths'].value) {
            pset.push( ...notes.map(note => note + '9'));
        }

        return pset.sort((a, b) => 0.5 - Math.random()).splice(0, count);
    }

    hostConnected() {
        this.host.requestUpdate();
    }

    save() {
        PracticeSetsController.save();
    }

    static save() {
        localStorage.setItem('bsharp-options', JSON.stringify(PracticeSetsController.options));
    }
}

const saveSettings = localStorage.getItem('bsharp-options');
if (saveSettings) {
    PracticeSetsController.options = JSON.parse(saveSettings);
    PracticeSetsController.currentSet = PracticeSetsController.generateRandomSet();
}