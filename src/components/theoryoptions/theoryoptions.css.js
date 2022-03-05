import { css } from 'lit';

export const styles = css`
    :host {
      font-family: Sans, Arial;
      font-size: 12px;
      display: flex;
      flex-direction: column;
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
`;
