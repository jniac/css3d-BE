const style = document.createElement('style')

style.innerHTML =
    /* css */ `
  #ui {
    --backdrop: blur(16px) brightness(1.15);

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding: 4px;
  }

  #ui .group {
    border: solid 1px black;
    padding: 4px;
    width: 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    backdrop-filter: var(--backdrop);
  }

  #ui .group > .name {
    text-decoration: underline;
  }

  #ui .group .contents {
    padding-left: 16px;
  }

  #ui div.input {
    max-width: 320px;
    display: flex;
    flex-direction: row;
    align-items: center;
    pointer-events: all;
    padding: 2px;
    backdrop-filter: var(--backdrop);
  }

  #ui div.input:hover {
    font-weight: 500;
    font-style: italic;
    color: #06f;
  }

  #ui div.input + div.input {
    border-top: solid 1px black;
  }


  #ui div.input > .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 0 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #ui div.input > .label + * {
    flex: 1 0 0;
  }

  #ui div.input > * + * {
    margin-left: 4px;
  }

  #ui div.input .value {
    padding-left: 4px;
    font-size: .66em;
  }

  #ui div.input.button {

    /* Because of conflicts with some bad-css somewhere. */
    border-radius: 0;
    width: unset;
    height: unset;
  }

  #ui div.input.button.switch.switch-on {
    font-weight: 900;
    font-style: italic;
  }

  #ui div.input.button.switch.switch-off {
    font-weight: 300;
    font-style: none;
  }

  #ui div.input.button button {
    flex: 1 0 0;
    font-weight: inherit;
    font-style: inherit;
  }

  #ui button,
  #ui select {
    font-family: inherit;
  }
  #ui button.selected {
    font-weight: 900;
  }
  #ui div.input .name {
    cursor: pointer;
  }

  #ui .buttons {
    display: flex;
    flex-wrap: wrap;
  }
`

document.head.append(style)

export {}
