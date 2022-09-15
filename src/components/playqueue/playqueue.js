import { LitElement } from 'lit';
import { template } from './playqueue.html';
import { styles } from './playqueue.css';
import { styles as button } from '../style/button.css';
import { PracticeSetsController } from '../../models/practicesets.js';
import { Note } from '../../musictheory/index.js';

export class PlayQueue extends LitElement {
    static get styles() { return [ styles, button ] }

    practicesets = new PracticeSetsController(this);

    render() {
        return template(this);
    }

    onChangeCustomSet(event) {
        let list = event.target.value.replace(/\s/g, ',').split(',').filter((note) => {
            let valid = note.length > 0;
            valid = valid && Note.flatNotations.indexOf(note.charAt(0).toUpperCase()) !== -1;
            return valid;
        })

        list = list.map(note => note.charAt(0).toUpperCase() + note.substring(1,note.length));
        this.practicesets.currentSet = list;
        event.target.value = '';
    }
}

customElements.define('bsharp-playqueue', PlayQueue);
