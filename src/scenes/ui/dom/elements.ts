import { NameArg, resolveNameArg } from '../types'

type DivProps = {
  updateValue: (value: any) => void,
}

const noop = () => {}
export const divProps = new Map<HTMLDivElement, DivProps>()

let currentGroupContent: HTMLDivElement | null = null

const createUiDiv = () => {
  const div = document.createElement(`div`)
  div.id = `ui`
  div.innerHTML = `<div class="wrapper"></div>`
  document.body.append(div)
  return div
}

export const getUiRootDiv = () => {
  return (
    document.querySelector(`#ui`) 
    ?? createUiDiv()
  ) as HTMLDivElement
}

export const getUiWrapperDiv = () => {
  return getUiRootDiv().querySelector(`.wrapper`) as HTMLDivElement
}

export const getUiInputDiv = (name: NameArg) => {
  const { id } = resolveNameArg(name)
  return getUiWrapperDiv().querySelector(`#${id}`) as HTMLDivElement
}

export const setStyle = ({
  root,
}: Partial<{
  root: Partial<CSSStyleDeclaration>
}> = {}) => {
  if (root) {
    Object.assign(getUiRootDiv().style, root)
  }
}

export const createDiv = (id: string, className: string, innerHTML: string) => {
  const div = document.createElement(`div`)
  div.id = id
  div.className = `input ${className}`
  div.innerHTML = innerHTML
  const parent = currentGroupContent ?? getUiWrapperDiv()
  parent.append(div)
  divProps.set(div, { updateValue: noop })
  return div
}

export const createGroup = (name: NameArg) => {
  const { id, displayName } = resolveNameArg(name)
  const div = document.createElement(`div`)
  div.id = id
  div.className = `group`
  div.innerHTML = `
    <div class="name">${displayName}</div>
    <div class="contents"></div>
  `
  let collapsed = false
  const divName = div.querySelector('.name') as HTMLDivElement
  divName.onclick = () => {
    collapsed = !collapsed
    div.classList.toggle('collapsed', collapsed)
  }
  const parent = currentGroupContent ?? getUiWrapperDiv()
  parent.append(div)
  return div
}

export const group = (name: NameArg, callback: () => void) => {
  const { id } = resolveNameArg(name)
  const previousGroupContent = currentGroupContent
  currentGroupContent = (
    getUiWrapperDiv().querySelector(`div#${id}.group .contents`)) 
    ?? (createGroup(name).querySelector('.contents')) as HTMLDivElement
  callback()
  currentGroupContent = previousGroupContent
}
