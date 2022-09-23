import { LitElement } from 'lit';
import { template } from './micsetup.html.js';
import { styles } from './micsetup.css.js';
import { styles as button } from '../../style/button.css.js';
import { VoxController } from '../../../inputs/vox.js';

export class MicSetup extends LitElement {
    static get styles() { return [ styles, button ] }

    vox = new VoxController(this);

    isVisualizing = false;

    render() {
        return template(this);
    }

    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (VoxController.active && this.isVisualizing === false) {
            this.isVisualizing = VoxController.active;
            this.renderVisualization();
        }
        this.isVisualizing = VoxController.active;
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    renderVisualization() {
        if (this.isVisualizing) {
            requestAnimationFrame(() => {
                this.renderVisualization();
            });
            VoxController.visualize(this.ctx, this.canvas.width, this.canvas.height);
        }
    }
}

customElements.define('bsharp-micsetup-panel', MicSetup);
