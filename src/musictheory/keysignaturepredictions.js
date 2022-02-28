import Note from './note.es6';

export default class {
    constructor() {
        /**
         * key signature score history
         * @type {Array}
         * @private
         */
        this._keySignatureScoreHistory = [];

        /**
         * history decay rate
         * @type {Number}
         * @private
         */
        this._keySignatureDecayRate = .9;

        Note.generateKeySignatureLookup();
    }

    /**
     * update keys pressed
     * @param {Array} keys
     */
    update(keys) {
        if (keys.length === 0) { return this._keySignatureScoreHistory; }
        var keysigScores = {};
        var topscore = -1;
        for (var sig in Note.keys) {
            var major = (sig.indexOf('m') === -1);
            var signotation = sig;
            if (!major) {
                signotation = signotation.slice(0, signotation.length-1); // get rid of minor denotation in string
            }
            for (var d = 0; d < keys.length; d++) {
                if (Note.keys[sig].indexOf(keys[d].notation) !== -1) {
                    if (!keysigScores[sig]) { keysigScores[sig] = 0; }
                    var ksg = Note.notesInKeySignature(signotation, major);
                    if (keys[d].notation === ksg[0]) {
                        keysigScores[sig] += 1.07; // root
                    } else if (keys[d].notation === ksg[2]) {
                        keysigScores[sig] += 1.06; // 3rd
                    } else if (keys[d].notation === ksg[4]) {
                        keysigScores[sig] += 1.05; // 5th
                    }  else if (keys[d].notation === ksg[6]) {
                        keysigScores[sig] += 1.02; // seventh
                    } else {
                        keysigScores[sig] += 1.0;
                    }

                    if (keysigScores[sig] > topscore) {
                        topscore = keysigScores[sig];
                    }

                    if (major) {
                        keysigScores[sig] += .01;
                    }
                    /*if (keys[d].notation === sig) {
                        keysigScores[sig] += .01; // small priority boost for root note
                    }*/
                }
            }
        }

        var scores = [];
        for (var score in keysigScores) {
            scores.push( { score: keysigScores[score], key: score, timestamp: Date.now() });
        }

        if (keys.length >= 3 && topscore >= keys.length * 1.0) {
            this.clearHistory(); // pretty clear we're holding a solid chord, and we should change entire history
        }

        this.decayHistoricalScores();
        return this.applyCurrentScoreToHistory(scores);
    }

    /**
     * clear history
     */
    clearHistory() {
        this._keySignatureScoreHistory = [];
    }

    /**
     * slowly decay current historical scores
     */
    decayHistoricalScores() {
        for (var c = 0; c < this._keySignatureScoreHistory.length; c++) {
            this._keySignatureScoreHistory[c].score *= this._keySignatureDecayRate;
        }
    }

    /**
     * apply scores to history (aggregate all scores: current and past)
     * @param scores
     */
    applyCurrentScoreToHistory(scores) {
        for (var c = 0; c < scores.length; c++) {
            var found = false;
            for (var d = 0; d < this._keySignatureScoreHistory.length; d++) {
                if (this._keySignatureScoreHistory[d].key === scores[c].key) {
                    found = true;
                    this._keySignatureScoreHistory[d].score += scores[c].score;
                }
            }
            if (!found) {
                this._keySignatureScoreHistory.push(scores[c]);
            }
        }
        return this._keySignatureScoreHistory.sort(function(a, b) { return (a.score < b.score ) ? 1 : ((b.score < a.score) ? -1 : 0); });
    }
}
