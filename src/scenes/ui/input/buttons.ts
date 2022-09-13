import { divProps, frame, createDiv, uiElement } from '../dom'
import { resolveUIValueArg, UIResult, UIValueArg } from '../types'
import { toArray } from '../utils'

export const create = <T extends readonly unknown[]>(
  name: string, 
  valueArg: UIValueArg<T[number]>, 
  options: Readonly<T>,
): UIResult<T[number]> => {
  const { value, initialValue } = resolveUIValueArg(valueArg)
  const div = createDiv(name, 'buttons', `
    <div class="label">
      <div class="name">${name}</div>
    </div>
    <div class="buttons">
      ${options.map(opt => `<button>${opt}</button>`).join('\n')}
    </div>
  `)
  const divName = div.querySelector('.name') as HTMLDivElement
  divName.onclick = () => {
    setSelectedIndex(options.indexOf(initialValue))
  }
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
  setSelectedIndex(options.indexOf(initialValue))
  divProps.get(div).updateValue = setSelectedIndex
  return { buttons, value, hasChanged: false }
}

export const buttons = <T extends readonly unknown[]>(
  name: string, 
  valueArg: UIValueArg<T[number]>, 
  options: Readonly<T>,
): UIResult<T[number]> => {
  const div = uiElement.querySelector(`#${name}`) as HTMLDivElement
  if (div) {
    const buttons = toArray(div.querySelectorAll('button'))
    const index = buttons.findIndex(button => button.classList.contains('selected'))
    const hasChanged = Number.parseInt(div.dataset.frame) === frame - 1
    const value = hasChanged ? options[index] : resolveUIValueArg(valueArg, options[index]).value
    divProps.get(div).updateValue(options.indexOf(value))
    return { buttons, value, hasChanged }
  }
  return create(name, valueArg, options)
}