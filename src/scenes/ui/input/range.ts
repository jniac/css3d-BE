import { divProps, frame, createDiv, uiElement } from '../dom'
import { resolveUIValueArg, UIResult, UIValueArg } from '../types'

type Step = number | 'any'

type Props = Partial<{ min: number, max: number, step: Step, decimals: number }>

type PropsArg = Props | [number, number, Step?, number?]

const resolvePropsArg = (arg: PropsArg = {}): Required<Props> => {
  if (Array.isArray(arg)) {
    const [min, max, step, decimals] = arg
    return resolvePropsArg({ min, max, step, decimals })
  }
  const {
    min = 0,
    max = 1,
    step = 'any',
    decimals = 2
  } = arg
  return {
    min,
    max,
    step,
    decimals,
  }
}

const create = (
  name: string, 
  valueArg: UIValueArg<number>, 
  props?: PropsArg,
): UIResult<number> => {
  const { value, initialValue } = resolveUIValueArg(valueArg)
  const { min, max, step, decimals } = resolvePropsArg(props)
  const format = (n: number) => n.toFixed(decimals)
  const div = createDiv(name, 'range', /* html */`
    <div class="label">
      <div class="name">${name}</div>
      <div class="value">(${format(value)})</div>
    </div>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${value}"></input>
  `)
  div.dataset.frame = frame.toString()
  const input = div.querySelector('input')
  const nameDiv = div.querySelector('.name') as HTMLDivElement
  const valueDiv = div.querySelector('.value') as HTMLDivElement
  const updateValue = (value: number, { triggerChange = false } = {}) => {
    input.value = value.toString()
    valueDiv.innerHTML = format(value)
    if (triggerChange) {
      div.dataset.frame = frame.toString()
    }
  }
  input.oninput = () => {
    const value = Number.parseFloat(input.value)
    updateValue(value, { triggerChange: true })
  }
  nameDiv.onclick = () => {
    updateValue(initialValue, { triggerChange: true })
  }
  divProps.get(div).updateValue = updateValue
  
  return { value, hasChanged: false, input }
}

export const range = (
  name: string, 
  valueArg: UIValueArg<number>, 
  props: PropsArg = {},
 ): UIResult<number> => {
  const div = uiElement.querySelector(`#${name}`) as HTMLDivElement
  if (div) {
    const input = div.querySelector('input')
    const inputValue = Number.parseFloat(input.value)
    const hasChanged = Number.parseInt(div.dataset.frame) === frame - 1
    const value = hasChanged ? inputValue : resolveUIValueArg(valueArg, inputValue).value
    divProps.get(div).updateValue(value)
    return { input, value, hasChanged }
  }
  return create(name, valueArg, props)
}