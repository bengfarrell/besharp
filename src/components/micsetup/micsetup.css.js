import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  span {
    font-size: 11px;
    width: 100%;
    display: inline-block;
    text-align: center;
  }

  button {
    width: 50%;
  }
  
  .hidden {
    display: none;
  }
`;
