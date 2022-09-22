import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    text-align: center;
  }
  
  #queue {
    margin-top: 15px;
    display: flex;
  }
  
  hr {
    width: 100%;
    height: 1px;
    margin-bottom: 15px;
    margin-top: 25px;
  }
  
  span.chord {
    padding: 5px;
    margin: 2px;
    min-width: 40px;
    height: 34px;
    display: flex;
    border-style: solid;
    border-color: var(--green);
    color: var(--green);
    cursor: pointer;
    align-items: center;
    text-align: center;
  }

  span.chord.current {
    background-color: var(--darkish);
    border-color: var(--darkish);
    color: var(--lightest);
  }

  button#refresh {
    width: 50px;
    height: 50px;
  }
  button#refresh svg {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    fill: var(--lightest);
  }
  
  textarea {
    margin-top: 10px;
    height: 50px;
  }
`;