import { css } from 'lit';

export const styles = css`
  :host {
    color-scheme: dark;
  }
  
  h1 {
    margin: 0;
    border-style: double;
    border-width: 3px;
    border-color: var(--light);
    color: var(--light);
    padding: 5px;
    text-align: center;
    text-decoration: underline;
  }
  
  .panel {
    background-color: var(--nosodark);
    border-style: solid;
    border-width: 1px;
    border-color: var(--kinda-light);
    color: var(--light);
    position: relative;
  }

  .padded-container {
    padding: 8px;
  }

  .button-container {
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .separator {
    border-top-style: double;
    border-top-width: 3px;
    border-top-color: var(--kindalight);
  }
  
  .panels-container {
    overflow-y: auto;
    background-color: var(--darkish);
    flex: 1;
  }
  
  .panel-header {
    background-color: var(--darkish);
    color: var(--light);
    border-bottom-color: var(--kindalight);
    border-bottom-width: 3px;
    border-bottom-style: double;
    padding: 4px;
    padding-left: 26px;
    position: relative;
    cursor: pointer;
  }

  .panel-content {
    padding: 15px;
    width: calc(100% - 30px);
    display: none;
  }

  .panel.open .panel-content {
    display: inline-block;
  }
  
  button.toggle-open {
    pointer-events: none;
    position: absolute; 
    margin: 0;
    width: 25px;
    height: 25px;
    min-height: 15px;
    left: 0px;
    top: 0px;
  }
  
  button.toggle-open span {
    pointer-events: none;
    display: inline-block;
    border-top: 8px solid var(--lightgreen);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-radius: 15px;
    transform: rotate(-90deg);
  }

  .panel.open button.toggle-open span {
    transform: rotate(0deg);
  }
  
  button {
    font-size: 24px;
    height: 50px;
    min-height: 50px;
    width: 100%;
  }
  
  .panel, button, h1 {
    margin-bottom: 8px;
  }
  
  p {
    font-size: 11px;
  }
`;
