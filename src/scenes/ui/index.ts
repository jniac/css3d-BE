import { range } from './input/range'
import { buttons } from './input/buttons'
import { group, setStyle } from './dom'

export const ui = {
  setStyle: (value: Parameters<typeof setStyle>[0]) => {
    setStyle(value)
    return ui
  },
  range,
  buttons,
  group,
}
