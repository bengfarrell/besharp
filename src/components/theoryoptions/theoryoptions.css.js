import { css } from 'lit';

export const styles = css`
    :host {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      width: 100%;
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
  
    div.section:first-child > label {
      margin-top: 0;
    }

    input[type="checkbox"] {
      accent-color: var(--green);
    }
  
    
`;
