import { css } from 'lit';

export const styles = css`
  .panel {
    background-color: #fafafa;
    position: relative;
  }
  
  .button-container {
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .panels-container {
    overflow-y: auto;
  }

  .panel-header {
    background-color: #cacaca;
    padding: 4px;
    padding-left: 26px;
  }

  .panel-content {
    padding: 15px;
    width: calc(100% - 30px);
    display: none;
  }

  .panel.open .panel-content {
    display: inline-block;
  }
  
  span.toggle-open {
    cursor: pointer;
    position: absolute;
    left: 5px;
    top: 9px;
    display: inline-block;
    border-top: 8px solid #6a6a6a;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    transform: rotate(-90deg);
  }

  .panel.open span.toggle-open {
    transform: rotate(0deg);
  }
  
  button {
    font-size: 24px;
    height: 50px;
    min-height: 50px;
    width: 100%;
  }
  
  .panel, button {
    margin-bottom: 8px;
  }
  
  p {
    font-size: 11px;
  }
`;
