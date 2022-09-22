import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  span, ul {
    margin-bottom: auto;
  }

  li {
    cursor: pointer;
    padding: 8px;
    border-style: solid;
    border-color: var(--kindalight);
    border-width: 1px;
  }

  li.open {
    background-color: var(--light);
    color: rgb(61, 145, 61);
  }

  span {
    font-size: 11px;
    width: 100%;
    display: inline-block;
    text-align: center;
  }

  button {
    width: 100%;
    height: 40px;
  }
`;
