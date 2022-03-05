import { Note, Chord } from '../musictheory';

export class Question {
    /** chord for question */
    chord = undefined;

    /** answer notes (with potential inversion) */
    notes = [];

    /** answer notes (with potential inversion) */
    lastAttempt = [];

    /** boolean to indicate if order of notes is important */
    enforceOrder = false;

    /** inversion of answer */
    inversion = 0;

    /** question display message */
    questionText = '';

    /** answer display message */
    answerText = '';

    /** inversion label for the user to know what order to play */
    inversionLabel = 'any';

    constructor(chordnotation, possibleinversions) {
        this.chord = new Chord(chordnotation);
        this.notes = this._getNotesWithInversion(this.chord, possibleinversions);
        if (possibleinversions.length > 0) {
            this.enforceOrder = true;
        }
        this.questionText = `${chordnotation} in ${this.inversionLabel} position`;
    }

    isCorrect(inputnotes) {
        this.lastAttempt = inputnotes;
        if (inputnotes.length < inputnotes.length) {
            return undefined;
        }

        if (this.enforceOrder) {
            const correct = this.notes.join(',') === inputnotes.join(',');
            this.answerText = correct ? 'Correct!' : `Sorry, you played ${inputnotes.join(', ')}. The correct answer is ${this.notes.join(', ')}`;
            return correct;
        } else {
            for (let c = 0; c < inputnotes.length; c++) {
                if (this.notes.indexOf(inputnotes[c]) === -1) {
                    this.answerText = `Sorry, you played ${this.lastAttempt.join(', ')}. The correct answer is ${this.notes.join(', ')}`;
                    return false;
                }
            }
            this.answerText = 'Correct!'
            return true;
        }
    }

    _getNotesWithInversion(chord, possibleInversions) {
        if (possibleInversions.length > 0) {
            const randominversion = possibleInversions[Math.floor(Math.random() * possibleInversions.length)];
            this.inversionLabel = `the ${randominversion}`;
            switch (randominversion) {
                case 'root':
                    this.inversion = 0;
                    return chord.inversion(0);

                case 'first':
                    this.inversion = 1;
                    return chord.inversion(1);

                case 'second':
                    this.inversion = 2;
                    return chord.inversion(2);

                case 'third':
                    this.inversion = 3;
                    if (chord.notes.length < 4) {
                        this.inversionLabel = 'the root';
                    }
                    return chord.getInversion(3);
            }
        } else {
            return chord.notes;
        }
    }

}
