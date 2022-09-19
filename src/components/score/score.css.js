import { css } from 'lit';

export const styles = css`
  :host {
    width: calc(100% - 30px);
    padding: 15px;
    display: flex;
    background-color: #9a9a9a;
    color: white;
  }

  :host(.incorrect) {
    background-color: #e34545;
  }

  .stats-container {
    flex: 1;
    margin-left: 15px;
    flex-direction: column;
    display: flex;
  }

  .stats-container span {
    font-size: 11px;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
  
  .piano-icon svg,
  .mic-icon svg {
    width: 74px;
    height: 50px;
    fill: white;
  }
`;
