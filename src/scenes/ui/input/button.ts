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
  const div = createDiv(id, 'button', /* html */`
    <button>${displayName}</button>
  `)
  const button = div.querySelector('button')
  button.onclick = () => {
    const value = div.dataset.switchState === 'on' ? false : true
    div.dataset.switchState = value ? 'on' : 'off'
    div.dataset.frame = frame.toString()
  }
  return { value, hasChanged: false, button }
}

export const button = (
  name: InputNameArg,
  switchOn: InputValueArg<boolean> = false,
  type: ButtonType = 'classic',
): InputResult<boolean> => {
  const div = getUiInputDiv(name)
  if (div) {
    const button = div.querySelector('button')
    const value = div.dataset.switchState === 'on' ? false : true
    const hasChanged = Number.parseInt(div.dataset.frame) === frame - 1
    return { value, hasChanged, button }
  }
  return create(name, switchOn, type)
}
