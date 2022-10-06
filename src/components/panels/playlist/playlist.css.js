import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 100%;
  }
  
  button.edit {
    width: 20px;
    height: 20px;
    padding: 0;
    outline: 0 !important;
    border-radius: 50px !important;
    margin-right: 5px;
  }

  button.edit svg {
    width: 20px;
    height: 20px;
    fill: white;
    margin-top: 1px;
  }
  
  #playlist {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #playlist .song {
    cursor: pointer;
    width: calc(100% - 20px);
    display: flex;
    padding: 10px;
    border-bottom-style: solid;
    border-bottom-color: var(--notsodark);
    border-bottom-width: 1px;
    align-items: center;
  }

  #playlist .song span {
    flex: 1;
    text-overflow: ellipsis;
  }
`;
