import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    height: 100%;
  }
  
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  bsharp-flashcard {
    background-color: var(--dark);
    height: 160px;
  }

  bsharp-score {
    margin-top: auto;
  }

  bsharp-sidepanel {
    min-width: 230px;
    width: 230px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--dark);
  }

  #no-mode-header {
    height: 100px;
    display: inline-block;
    padding: 30px;
    width: calc(100% - 60px);
    background-color: var(--dark);
    outline-width: 3px;
    outline-style: double;
    outline-color: var(--darkish);
    outline-offset: -20px;
    color: var(--light);
    font-weight: 100;
  }
`;
