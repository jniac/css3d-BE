const style = document.createElement('style')
style.innerHTML =
    /* css */ `
  #ui {
    position: fixed;
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
