export const uiElement = document.querySelector('#ui')

type DivProps = {
  updateValue: (value: any) => void,
}

const noop = () => {}
export const divProps = new Map<HTMLDivElement, DivProps>()

let currentGroup: HTMLDivElement | null = null

export const createDiv = (id: string, className: string, innerHTML: string) => {
  const div = document.createElement('div')
  div.id = id
  div.className = `input ${className}`
  div.innerHTML = innerHTML
  const parent = currentGroup ?? uiElement
  parent.append(div)
  divProps.set(div, { updateValue: noop })
  return div
}

export const createGroup = (id: string) => {
  const div = document.createElement('div')
  div.id = id
  div.className = `group`
  div.innerHTML = `
    <div class="name">${id}</div>
    <div class="contents">
    </div>
  `
  const parent = currentGroup ?? uiElement
  parent.append(div)
  return div
}



export const group = (id: string, callback: () => void) => {
  console.log(id)
  const previousGroup = currentGroup
  currentGroup = (uiElement.querySelector(`div#${id}.group .contents`) as HTMLDivElement) ?? (createGroup(id).querySelector('.contents') as HTMLDivElement)
  callback()
  currentGroup = previousGroup
}
