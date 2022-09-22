import { css } from 'lit';

export const styles = css`
  button {
    font-family: museo-sans, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    color: var(--lightest);
    border: none;
    border-radius: 5px;
    padding: 5px;
    outline-width: 3px;
    outline-style: double;
    outline-color: var(--lightgreen);
    outline-offset: -8px;
    text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
    background: var(--action-gradient);
    height: 40px;
  }
  
  button.has-icon {
    outline: none;
  }

  button.invisible {
    background: none;
    outline: none;
  }
  
  button.large {
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    background: var(--action-hover);
  }

  button.invisible:hover {
    background: none;
  }

  button:active {
    background: #d3d3d3;
    color: #868686;
  }
`;
