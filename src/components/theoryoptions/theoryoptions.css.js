import { css } from 'lit';

export const styles = css`
    :host {
      font-family: Sans, Arial;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  
    .tab-container {
      width: calc(100% - 10px);
      display: flex;
      background-color: #bababa;
      padding: 8px;
    }

    .tab-container button {
      flex: 1;
      border: none;
      background-color: white;
      cursor: pointer;
    }

    .tab-container button.active {
      background-color: #9a9a9a;
      color: white;
    }
  
    div.section > label {
      text-transform: uppercase;
      font-weight: bolder;
      color: #bababa;
      font-size: 10px;
      margin-bottom: 5px;
      margin-top: 15px;
      display: inline-block;
    }
    
    textarea {
      width: 100%;
      margin-top: 10px;
    }
  
    .current-set {
      font-size: 10px;
      font-weight: bold;
    }
  
    div.section:first-child > label {
      margin-top: 0;
    }
`;
