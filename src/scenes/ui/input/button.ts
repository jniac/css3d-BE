import { createDiv, frame, getUiInputDiv } from '../dom'
import { InputNameArg, InputResult, InputValueArg, resolveNameArg, resolveValueArg } from '../types'

type ButtonType = 'classic' | 'switch'

const create = (
  name: InputNameArg,
  switchOn: InputValueArg<boolean> = false,
  type: ButtonType = 'classic',
): InputResult<boolean> => {
  const { id, displayName } = resolveNameArg(name)
  let { value } = resolveValueArg(switchOn)
  const div = createDiv(id, `button ${type}`, /* html */`
    <button>${displayName}</button>
  `)
  const button = div.querySelector('button')
  const updateValue = (value: boolean, { triggerChange = false } = {}) => {
    div.dataset.switchState = value ? 'on' : 'off'
    div.classList.toggle('switch-on', value)
    div.classList.toggle('switch-off', !value)
    if (type === 'switch') {
      button.innerHTML = `${displayName} (${value ? 'on' : 'off'})`
    }
    if (triggerChange) {
      div.dataset.frame = frame.toString()
    }
  }
  button.onclick = () => {
    const currentValue = div.dataset.switchState === 'on'
    updateValue(!currentValue, { triggerChange: true })
  }
  updateValue(value)
  return { value, hasChanged: false, button }
}

export const button = (
  name: InputNameArg,
  switchOn?: InputValueArg<boolean>,
  type: ButtonType = switchOn === undefined ? 'classic' : 'switch',
): InputResult<boolean> => {
  const div = getUiInputDiv(name)
  if (div) {
    const button = div.querySelector('button')
    const value = div.dataset.switchState === 'on'
    const hasChanged = Number.parseInt(div.dataset.frame) === frame - 1
    return { value, hasChanged, button }
  }
  return create(name, switchOn, type)
}
