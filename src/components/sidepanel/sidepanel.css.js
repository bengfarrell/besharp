import { css } from 'lit';

export const styles = css`
  :host {
    padding: 15px;
  }
  
  .section {
    background-color: #fafafa;
    min-height: 150px;
    padding: 8px;
    width: calc(100% - 16px);
  }
  
  button {
    font-size: 24px;
    height: 50px;
    width: 100%;
  }
  
  .section, button {
    margin-bottom: 8px;
  }
  
  p {
    font-size: 11px;
  }
`;
