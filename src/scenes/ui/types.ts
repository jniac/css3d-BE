
export type UIValueArg<T> = 
  | { value: T, initialValue?: T } 
  | { initialValue: T }
  | [T, T] 
  | T

export type UIResult<T> = {
  value: T
  hasChanged: boolean
  [key: string]: any
}

export const resolveUIValueArg = <T>(arg: UIValueArg<T>, currentValue?: T) => {
  if (Array.isArray(arg)) {
    const [initialValue, value] = arg
    return { value, initialValue }
  }
  if (typeof arg === 'object') {
    if ('value' in arg) {
      const { value, initialValue = value } = arg as { value: T, initialValue?: T }
      return { value, initialValue }
    } else {
      const { initialValue } = arg as { initialValue: T }
      return { value: currentValue ?? initialValue, initialValue }
    }
  }
  return { value: arg, initialValue: arg }
}
