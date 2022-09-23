import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input, select {
    margin-top: 5px;
  }
  
  button {
    width: 100%;
  }

  .tiny-text {
    text-align: center;
    margin-top: 5px;
  }
`;
