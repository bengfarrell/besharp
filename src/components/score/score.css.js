import { css } from 'lit';

export const styles = css`
  :host {
    width: calc(100% - 30px);
    padding: 15px;
    display: flex;
    background-color: var(--darkish);
    color: white;
    border-left-style: solid;
    border-left-width: 1px;
    border-left-color: var(--kindalight);
  }

  :host(.incorrect) {
    background-color: var(--incorrect-color);
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
