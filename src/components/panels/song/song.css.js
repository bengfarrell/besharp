import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  
  h1 {
    margin-bottom: 0;
  }
  
  button.add-bar {
    font-weight: 700 !important;
    width: 40px !important;
    height: 40px !important;
    margin-left: 15px;
    border-radius: 50px !important;
    margin-top: 20px;
    z-index: 1;
    outline-color: var(--light) !important;
    outline-width: 1px !important;
    outline-offset: 0 !important;
  }
  
  #segment-add-container {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    margin-top: 15px;
    width: calc(100% - 40px);
  }
  
  textarea {
    width: calc(100% - 40px);
    max-width: calc(100% - 40px);
    margin-top: 10px;
  }
  
  input#title-input {
    width: 50%;
    margin-top: 15px;
  }
  
  #segment-add-container select {
    height: 40px;
  }

  #segment-add-container input {
    width: 40px;
    height: 34px;
  }
  
  #song-line-container {
    background-color: var(--darkish);
    flex: 1;
    width: calc(100% - 40px);
    margin-bottom: 20px;
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-top: 11px;
  }

  .song-bar {
    display: flex;
    color: var(--light);
    align-items: center;
    border-bottom-style: solid;
    border-bottom-color: var(--notsodark);
    border-bottom-width: 1px;
    padding: 10px;
    user-select: none;
  }

  .song-bar .drag-handle {
    cursor: ns-resize;
  }

  .song-bar .drag-handle svg {
    height: 20px;
    width: 20px;
    margin-top: 8px;
    fill: var(--kindalight);
    pointer-events: none;
  }

  .song-bar input,
  .song-bar select {
    color: var(--lighter);
    background-color: var(--notsodark);
    border-style: solid;
    border-width: 1px;
    border-color: var(--darkish);
  }

  .song-bar label.beats-field {
    font-weight: 700;
    margin-left: 15px;
    margin-right: 5px;
  }
  
  .song-bar input.beats-field {
    width: 25px;
    height: 24px;
  }

  .song-bar input.lyrics-field {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    height: 24px;
  }

  .song-bar select {
    height: 30px;
  }

  .song-bar span.lyrics {
    font-weight: 100;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  button.copy {
    margin-right: 5px;
  }

  button.copy svg {
    width: 30px;
    height: 30px;
    margin-left: -10px;
    margin-top: -5px;
    fill: white;
  }
`;
