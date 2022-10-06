import { css } from 'lit';

export const styles = css`
  :host {
    --dark: #2a2a2a;
    --darkish: #4a4a4a;
    --notsodark: #6a6a6a;
    --kindalight: #a9a9a9;
    --light: #cacaca;
    --lightest: #fafafa;

    --darkgreen: #385b09;
    --green: #4e7d0e;
    --lightgreen: #7db72f;

    --lightred: #c54a4a;
    --red: #771414;

    --action-color: var(--green);
    --action-gradient: linear-gradient(to left top, var(--lightgreen) 0%, var(--green) 100%);
    --action-hover: linear-gradient(to left top, var(--green) 0%, var(--darkgreen) 100%);

    --incorrect-color: var(--red);
  }`;