import { range } from './input/range'
import { button } from './input/button'
import { buttons } from './input/buttons'
import { group, setStyle } from './dom'

export const ui = {
  setStyle: (value: Parameters<typeof setStyle>[0]) => {
    setStyle(value)
    return ui
  },
  range,
  button,
  buttons,
  group,
}
