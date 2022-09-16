import { NameArg, resolveNameArg } from '../types'

type DivProps = {
  updateValue: (value: any) => void,
}

const noop = () => {}
export const divProps = new Map<HTMLDivElement, DivProps>()

let currentGroupContent: HTMLDivElement | null = null

const createUiDiv = () => {
  const div = document.createElement('div')
  div.id = 'ui'
  document.body.append(div)
  return div
}

export const getUiRootDiv = () => {
  return (document.querySelector('div#ui') as HTMLDivElement) ?? createUiDiv()
}

export const getUiInputDiv = (name: NameArg) => {
  const { id } = resolveNameArg(name)
  return getUiRootDiv().querySelector(`#${id}`) as HTMLDivElement
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
  const parent = currentGroupContent ?? getUiRootDiv()
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
  const parent = currentGroupContent ?? getUiRootDiv()
  parent.append(div)
  return div
}



export const group = (name: NameArg, callback: () => void) => {
  const { id } = resolveNameArg(name)
  const previousGroupContent = currentGroupContent
  currentGroupContent = (
    getUiRootDiv().querySelector(`div#${id}.group .contents`)) 
    ?? (createGroup(id).querySelector('.contents')) as HTMLDivElement
  callback()
  currentGroupContent = previousGroupContent
}
