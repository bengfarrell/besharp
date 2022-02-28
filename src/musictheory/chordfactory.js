/**
 * Chord Factory - Build an array of notations or actual notes (audiolib oscillator)
 * @constructor
 */
export const ChordFactory = {
    /**
     * create a list of notations from chord
     * @static
     * @param {string} chord notation
     * @param {Array.<string>} notation array (individual notes)
     */
    createNotations: function createNotations(notation, octave) {
        var chord = new Chord(notation, octave);
        return chord.getNotations();
    }
}
