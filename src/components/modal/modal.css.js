import { css } from 'lit';

export const styles = css`
  :host {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  
  #modal {
    position: absolute;
    display: flex;
    border-radius: 8px;
    outline-width: 3px;
    outline-style: double;
    outline-color: var(--darkish);
    outline-offset: -10px;
    background-color: var(--light);

    left: 10%;
    right: 10%;
    top: 10%;
    bottom: 10%;
  }
  
  #click-cover {
    background-color: black;
    opacity: .75;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
  
  button {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 24px !important;
    font-weight: 700 !important;
    width: 40px !important;
    height: 40px !important;
    outline: none !important;
  }

  ::slotted(*) {
    width: 100%;
    height: 100%;
  }

`;