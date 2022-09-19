const style = document.createElement('style')

style.innerHTML =
    /* css */ `
  #ui, #ui * {
    position: relative;
    box-sizing: border-box;
  }

  #ui {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
    padding: 4px;
  }

  #ui > .wrapper {
    backdrop-filter: blur(16px) brightness(1.15);
    -webkit-backdrop-filter: blur(16px) brightness(1.15);
  }

  #ui > * {
    pointer-events: all;
  }

  #ui .group {
    border: solid 1px black;
    padding: 4px;
    width: 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
  }

  #ui .group + .group {
    border-top: none;
  }

  #ui .group::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    top: 0;
    right: 0;
    border-left: solid 1px black;
    border-bottom: solid 1px black;
    transform: translate(-5px, 10px) rotate(45deg);
  }

  #ui .group > .name {
    text-decoration: underline;
    cursor: pointer;
  }

  #ui .group .contents {
    padding-left: 16px;
  }

  #ui .group.collapsed::after {
    transform: translate(-8px, 10px) rotate(-45deg);
  }

  #ui .group.collapsed .contents {
    display: none;
  }

  #ui div.input {
    max-width: 320px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px;
  }

  #ui div.input:hover {
    font-weight: 500;
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

  #ui div.input.button.switch.switch-on {
    font-weight: 600;
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

  /* 
    BAD-CSS-CONFLICT ->
    Because of conflicts with some bad-css somewhere. 
  */
    #ui div.input.button {
    border-radius: 0;
    width: unset;
    height: unset;
    top: unset;
    left: unset;
  }
  
  #ui div.input.button:hover {
    background: unset;
  }
  /*
    BAD-CSS-CONFLICT <-
  */
`

document.head.append(style)

export {}
