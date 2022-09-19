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
  }
  
  hr {
    width: 100%;
    height: 1px;
    margin-bottom: 15px;
    margin-top: 25px;
  }
  
  #set-generation {
    display: flex;
    align-items: center;
  }
  
  #set-generation textarea {
    height: 75px;
    margin-left: 15px;
  }

  #set-generation button {
    margin-right: 15px;
    height: 50px;
  }
  
  span.chord {
    padding: 5px;
    margin: 2px;
    border-style: solid;
    border-color: #acacac;
    color: #acacac;
    cursor: pointer;
  }

  span.chord.current {
    background-color: #6a6a6a;
    border-color: white;
    color: white
  }
`;