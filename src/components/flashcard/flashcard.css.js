import { css } from 'lit';

export const styles = css`
  :host {
    width: 100%;
    height: 100px;
    display: flex;
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
  }

  :host span.question-ui {
    font-weight: bolder;
  }
  
  #progress-bar {
    background-color: #999999;
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
    font-size: 24px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3a3a3a;
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
  }

  #play-controls {
    display: flex;
  }
`;
