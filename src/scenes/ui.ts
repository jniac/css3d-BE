
const style = document.createElement('style')
style.innerHTML =
/* css */`
  #ui {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    flex-direction: column;
  }

  #ui > div.input {
    display: flex;
    flex-direction: row;
    align-items: center;
    pointer-events: all;
    padding: 2px;
  }

  #ui > div.input > .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 0 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  #ui > div.input > * + * {
    margin-left: 4px;
  }

  #ui > div.input .value {
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
`
document.head.append(style)

const uiElement = document.querySelector('#ui')

let frame = 0
const loop = () => {
  requestAnimationFrame(loop)
  frame++
}
requestAnimationFrame(loop)

const getDiv = (id: string, className: string, innerHTML: string) => {
  const div = document.createElement('div')
  div.id = id
  div.className = `input ${className}`
  div.innerHTML = innerHTML
  uiElement.append(div)
  return div
}

const toArray = <T>(value: ArrayLike<T>) => {
  const array = new Array(value.length) as T[]
  for (let i = 0, max = value.length; i < max; i++) {
    array[i] = value[i]
  }
  return array
}

const factory = {

  input: (() => {
    type InputType = 'range' | 'checkbox'
    const create = (name: string, type: InputType, props: Record<string, any>) => {
      const div = getDiv(name, type, /* html */`
        <div class="label">
          <div class="name">${name}</div>
          <div class="value">(${props.value})</div>
        </div>
        <input type="range" min="0" max="1" step="any"></input>
      `)
      const input = div.querySelector('input')
      const divValue = div.querySelector('.value')
      input.type = type
      for (const key in props) {
        input.setAttribute(key, props[key])
      }
      if (type === 'checkbox') {
        input.checked = !!props.value
      }
      input.oninput = () => {
        if (type === 'range') {
          divValue.innerHTML = `(${parseFloat(input.value).toFixed(2)})`
        }
        if (type === 'checkbox') {
          divValue.innerHTML = `(${input.checked})`
        }
        div.dataset.frame = frame.toFixed()
      }
      (div.querySelector('div.name') as HTMLDivElement).onclick = () => {
        input.value = props.value
        input.oninput(null)
      }
      return { value: props.value, input, hasChanged: false }
    }
    const get = (name: string, type: InputType, props: Record<string, any>) => {
      const div = uiElement.querySelector(`#${name}`) as HTMLDivElement
      if (div) {
        const input = div.querySelector('input')
        const value = Number.parseFloat(input.value)
        const hasChanged = Number.parseInt(div.dataset.frame) === frame - 1
        return { value, input, hasChanged }
      }
      return create(name, type, props)
    }
    return { create, get }
  })(),

  select: (() => {
    const create = (name: string, options: Readonly<string[]>, currentOption: string) => {
      const div = getDiv(name, 'select', /* html */`
        <div class="label">${name}</div>
        <select>
          ${options.map(str => (
        `<option>${str}</option>`
      )).join('\n')}
        </select>
      `)
      const select = div.querySelector('select')
      select.selectedIndex = options.indexOf(currentOption)
      select.oninput = () => {
        div.dataset.frame = frame.toFixed()
      }
      return { select, value: currentOption, hasChanged: false }
    }
    const get = (name: string, options: Readonly<string[]>, currentOption: string) => {
      const div = uiElement.querySelector(`#${name}`) as HTMLDivElement
      if (div) {
        const select = div.querySelector('select')
        const value = options[select.selectedIndex]
        const hasChanged = Number.parseInt(div.dataset.frame) === frame - 1
        return { select, value, hasChanged }
      }
      return create(name, options, currentOption)
    }
    return { create, get }
  })(),

  buttons: (() => {
    const create = (name: string, options: Readonly<string[]>, currentOption: string) => {
      const div = getDiv(name, 'buttons', `
        <div class="label">${name}</div>
        ${options.map(opt => `<button>${opt}</button>`).join('\n')}
      `)
      const buttons = toArray(div.querySelectorAll('button'))
      const indexHistory = [] as number[]
      const currentSelectedIndexIs = (index: number) => indexHistory.length > 0 && indexHistory[indexHistory.length - 1] === index
      const setSelectedIndex = (selectedIndex: number) => {
        if (currentSelectedIndexIs(selectedIndex) === false) {
          indexHistory.push(selectedIndex)
          div.dataset.frame = frame.toFixed()
          for (let index = 0, max = buttons.length; index < max; index++) {
            const button = buttons[index]
            button.classList.toggle('selected', index === selectedIndex)
          }
        }
      } 
      for (let index = 0, max = buttons.length; index < max; index++) {
        const button = buttons[index]
        button.onclick = () => {
          if (currentSelectedIndexIs(index)) {
            indexHistory.pop()
            const newIndex = indexHistory.pop() ?? 0
            setSelectedIndex(newIndex)
          } else {
            setSelectedIndex(index)
          }
        }
      }
      setSelectedIndex(options.indexOf(currentOption))
      return { buttons, value: currentOption, hasChanged: false }
    }
    const get = (name: string, options: Readonly<string[]>, currentOption: string) => {
      const div = uiElement.querySelector(`#${name}`) as HTMLDivElement
      if (div) {
        const buttons = toArray(div.querySelectorAll('button'))
        const index = buttons.findIndex(button => button.classList.contains('selected'))
        const value = options[index]
        const hasChanged = Number.parseInt(div.dataset.frame) === frame - 1
        return { buttons, value, hasChanged }
      }
      return create(name, options, currentOption)
    }
    return { create, get }
  })(),
}

type UIResult<T> = {
  value: T
  hasChanged: boolean
}
export const ui = {
  range: (name: string, value: number, props?: Record<string, any>): UIResult<number> => {
    return factory.input.get(name, 'range', { value, ...props })
  },
  checkbox: (name: string, value: boolean, props?: Record<string, any>): UIResult<boolean> => {
    return factory.input.get(name, 'checkbox', { value, ...props })
  },
  enumSelect: <T extends readonly string[]>(name: string, options: T, currentOption: T[number]): UIResult<T[number]> => {
    return factory.select.get(name, options, currentOption)
  },
  enumButtons: <T extends readonly string[]>(name: string, options: T, currentOption: T[number]): UIResult<T[number]> => {
    return factory.buttons.get(name, options, currentOption)
  },
}

