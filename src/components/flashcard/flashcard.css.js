import { css } from 'lit';

export const styles = css`
  :host {
    width: 100%;
    height: 100px;
    display: flex;
    color: var(--lightest);
    outline-width: 3px;
    outline-style: double;
    outline-color: var(--darkish);
    outline-offset: -20px;
  }
  
  :host([transition]) .question-ui {
    display: none !important;
  }

  :host(:not([transition])) #progress-bar {
    display: none !important;
  }

  :host .question-ui {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-left: 40px;
  }
  
  #progress-bar {
    background-color: var(--darkish);
    width: 100%;
    height: 100%;
    animation: progressBar 3.5s ease-in-out;
    animation-fill-mode: both;
  }
  
  #transition-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #transition-container * {
    position: absolute;
  }

  #transition-messaging {
    font-size: 36px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--lightest);
    width: 100%;
    height: 100%;
  }

  @keyframes progressBar {
    0% { width: 100%; }
    100% { width: 0; }
  }
  
  button {
    height: 80px;
    width: 80px;
  }
  
  .stats-container {
    flex: 1;
    margin-left: 15px;
  }

  .stats-container span {
    font-size: 11px;
  }
  
  h1 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 38px;
  }

  #play-controls {
    display: flex;
  }
  
  input {
    width: 50px;
  }
  
  select {
    width: 125px;
  }
`;
