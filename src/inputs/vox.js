// Note recognition adapted from https://alexanderell.is/posts/tuner/tuner.js
// License for above:

/*
The MIT License (MIT)
Copyright (c) 2014 Chris Wilson
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Note: autoCorrelate comes from https://github.com/cwilso/PitchDetect/pull/23
with the above license.
*/

export class VoxController {
    static OCTAVE = 4;

    static hosts = [];

    static listeners = [];

    static note = undefined;

    static active = false;

    static previousValueToDisplay = 0;

    static smoothingCount = 0;

    static smoothingThreshold = 5;

    static smoothingCountThreshold = 5;

    static analyser = undefined;

    static audioContext = undefined;

    static source = undefined;

    constructor(host) {
        host.addController(this);
        VoxController.hosts.push(host);
    }

    static toggleMicrophone() {
        if (VoxController.active) {
            VoxController.stopMicrophone();
        } else {
            VoxController.startMicrophone();
        }
    }

    static stopMicrophone() {
        VoxController.active = false;
        if (VoxController.audioContext) {
            VoxController.audioContext.close();
        }
        VoxController.hosts.forEach(host => {
            host.requestUpdate();
        });
        VoxController.listeners.forEach(cb => cb({ active: VoxController.active, note: VoxController.note }));
    }

    static startMicrophone() {
        VoxController.audioContext = new AudioContext();
        VoxController.analyser = VoxController.audioContext.createAnalyser();
        VoxController.analyser.minDecibels = -100;
        VoxController.analyser.maxDecibels = -10;
        VoxController.analyser.smoothingTimeConstant = 0.85;
        if (!navigator?.mediaDevices?.getUserMedia) {
            // No audio allowed
            console.warn('Sorry, getUserMedia is required for the app.')
            return;
        } else {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(
                    (stream) => {
                        // Initialize the SourceNode
                        VoxController.source = VoxController.audioContext.createMediaStreamSource(stream);
                        // Connect the source node to the analyzer
                        VoxController.source.connect(VoxController.analyser);
                        VoxController.active = true;
                        VoxController.hosts.forEach(host => {
                            host.requestUpdate();
                        });
                        // VoxController.listeners.forEach(cb => cb({ active: VoxController.active, note: VoxController.note, octave: VoxController.OCTAVE }));
                        VoxController.detect();
                    }
                )
                .catch((err) => {
                    console.warn('Sorry, microphone permissions are required for the app')
                });
        }
    }

    static detect() {
        requestAnimationFrame(() => {
            if (VoxController.active) {
                VoxController.detect();
            }
        });
        this.detectNote();
    }

    addListener(callback) {
        VoxController.addListener(callback);
    }

    static addListener(callback) {
        VoxController.listeners.push(callback);
    }

    hostConnected() {
        VoxController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    static visualize(ctx, width, height) {
        // Thanks to PitchDetect: https://github.com/cwilso/PitchDetect/blob/master/js/pitchdetect.js
        VoxController.fftSize = 2048;
        const bufferLength = VoxController.analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        VoxController.analyser.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(200, 200, 200)';
        ctx.beginPath();

        const sliceWidth = width * 1.0 / bufferLength;
        let x = 0;

        for(let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * height / 2;

            if(i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
    }

    static detectNote() {
        const bufferLength = VoxController.analyser.fftSize;
        const buffer = new Float32Array(bufferLength);
        VoxController.analyser.getFloatTimeDomainData(buffer);
        const autoCorrelateValue = VoxController.autoCorrelate(buffer, VoxController.audioContext.sampleRate)

        // Handle rounding
        let note, octave;
        // Get the closest note
        // Thanks to PitchDetect:
        const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        note = noteStrings[VoxController.noteFromPitch(autoCorrelateValue) % 12];

        const smoothingValue = 'basic' // very, none

        if (autoCorrelateValue === -1) {
            VoxController.updateNote(undefined);
            return;
        }
        if (smoothingValue === 'none') {
            VoxController.smoothingThreshold = 99999;
            VoxController.smoothingCountThreshold = 0;
        } else if (smoothingValue === 'basic') {
            VoxController.smoothingThreshold = 10;
            VoxController.smoothingCountThreshold = 5;
        } else if (smoothingValue === 'very') {
            VoxController.smoothingThreshold = 5;
            VoxController.smoothingCountThreshold = 10;
        }
        // Check if this value has been within the given range for n iterations
        if (VoxController.noteIsSimilarEnough(note, VoxController.previousValueToDisplay, VoxController.smoothingThreshold)) {
            if (VoxController.smoothingCount < VoxController.smoothingCountThreshold) {
                VoxController.smoothingCount++;
                return;
            } else {
                VoxController.previousValueToDisplay = note;
                VoxController.smoothingCount = 0;
            }
        } else {
            VoxController.previousValueToDisplay = note;
            VoxController.smoothingCount = 0;
            return;
        }

        VoxController.updateNote(note);
    }

    static updateNote(note) {
        const lastNote = VoxController.note ? VoxController.note.substring(0, VoxController.note.length-1) : undefined;
        if (note + '4' !== VoxController.note) {
            VoxController.note = note ? note + VoxController.OCTAVE : undefined;
            if (note) {
                VoxController.listeners.forEach(cb => cb({ type: 'down', note: note, octave: VoxController.OCTAVE }));
            }
            if (lastNote) {
                VoxController.listeners.forEach(cb => cb({ type: 'up', note: lastNote, octave: VoxController.OCTAVE }));
            }
            VoxController.hosts.forEach(host => {
                host.requestUpdate();
            });
        }
    }

    static noteIsSimilarEnough(valueToDisplay, previousValueToDisplay, smoothingThreshold) {
        // Check threshold for number, or just difference for notes.
        if (typeof(valueToDisplay) == 'number') {
            return Math.abs(valueToDisplay - previousValueToDisplay) < smoothingThreshold;
        } else {
            return valueToDisplay === previousValueToDisplay;
        }
    }

    static autoCorrelate(buffer, sampleRate) {
        // Perform a quick root-mean-square to see if we have enough signal
        let SIZE = buffer.length;
        let sumOfSquares = 0;
        for (let i = 0; i < SIZE; i++) {
            const val = buffer[i];
            sumOfSquares += val * val;
        }
        const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE)
        if (rootMeanSquare < 0.01) {
            return -1;
        }

        // Find a range in the buffer where the values are below a given threshold.
        let r1 = 0;
        let r2 = SIZE - 1;
        const threshold = 0.2;

        // Walk up for r1
        for (let i = 0; i < SIZE / 2; i++) {
            if (Math.abs(buffer[i]) < threshold) {
                r1 = i;
                break;
            }
        }

        // Walk down for r2
        for (let i = 1; i < SIZE / 2; i++) {
            if (Math.abs(buffer[SIZE - i]) < threshold) {
                r2 = SIZE - i;
                break;
            }
        }

        // Trim the buffer to these ranges and update SIZE.
        buffer = buffer.slice(r1, r2);
        SIZE = buffer.length

        // Create a new array of the sums of offsets to do the autocorrelation
        const c = new Array(SIZE).fill(0);
        // For each potential offset, calculate the sum of each buffer value times its offset value
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE - i; j++) {
                c[i] = c[i] + buffer[j] * buffer[j+i]
            }
        }

        // Find the last index where that value is greater than the next one (the dip)
        let d = 0;
        while (c[d] > c[d+1]) {
            d++;
        }

        // Iterate from that index through the end and find the maximum sum
        let maxValue = -1;
        let maxIndex = -1;
        for (let i = d; i < SIZE; i++) {
            if (c[i] > maxValue) {
                maxValue = c[i];
                maxIndex = i;
            }
        }

        let T0 = maxIndex;

        // Not as sure about this part, don't @ me
        // From the original author:
        // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
        // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
        // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
        const x1 = c[T0 - 1];
        const x2 = c[T0];
        const x3 = c[T0 + 1]

        const a = (x1 + x3 - 2 * x2) / 2;
        const b = (x3 - x1) / 2
        if (a) {
            T0 = T0 - b / (2 * a);
        }

        return sampleRate/T0;
    }

    static noteFromPitch( frequency ) {
        const noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
        return Math.round( noteNum ) + 69;
    }
}
