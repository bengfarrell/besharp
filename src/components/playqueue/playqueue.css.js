import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    width: 100%;
  }
  
  #button-holder {
    margin-right: auto;
    margin-left: auto;
    display: inline-block;
    padding: 20px;
    max-width: 80%;
  }
  
  #lyrics {
    margin-right: auto;
    margin-left: auto;
    display: inline-block;
    max-width: 80%;
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
  
  span.lyric {
    background-color: var(--lightest);
    padding: 3px;
    margin: 3px;
    display: inline-block;
    border-style: solid;
    border-width: 1px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    border-color: var(--green);
    color: var(--green);
  }
  
  span.lyric.current {
    color: var(--darkish);
    border-color: var(--darkish);
    font-weight: 700;
  }
  
  button span {
    margin-top: -3px;
    position: relative;
    top: -6px;
  }

  button svg {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    fill: var(--lightest);
  }
  
  textarea {
    margin-top: 10px;
    max-width: 90%;
    width: 70%;
    text-align: center;
    align-self: center;
    height: 50px;
  }
`;