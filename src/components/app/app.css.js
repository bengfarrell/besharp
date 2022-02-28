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
  
  krill-flashcard {
    margin-bottom: 20px;
  }
  
  krill-score {
    margin-top: auto;
  }  
  
  krill-sidepanel {
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #eaeaea;
  }
`;
