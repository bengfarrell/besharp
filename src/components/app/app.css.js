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
    margin-bottom: 20px;
  }

  bsharp-score {
    margin-top: auto;
  }

  bsharp-sidepanel {
    min-width: 230px;
    width: 230px;
    height: calc(100% - 30px);
    padding: 15px;
    display: flex;
    flex-direction: column;
    background-color: #eaeaea;
  }

  #no-mode-header {
    height: 100px;
    display: inline-block;
    margin-bottom: 5px;
    padding: 15px;
    width: calc(100% - 30px);
  }

  #main-container {
    padding: 5px;
  }
`;
