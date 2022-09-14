
type Point = { x: number, y: number }

type PointInfo = {
  point: Point
  time: number
} 

type Pointer = {
  isDown: boolean
  point: Point
  delta: Point
  pointOld: Point
  dragDelta: Point
  dragTotal: Point
  down: PointInfo
  up: PointInfo
}

type Bundle = { 
  pointer: Pointer
  destroy: () => void
}

const map = new Map<HTMLElement | string, Bundle>()

const watch = (element: HTMLElement): Bundle => {
  const pointer: Pointer = {
    isDown: false,
    point: { x: 0, y: 0 },
    delta: { x: 0, y: 0 },
    pointOld: { x: 0, y: 0 },
    dragDelta: { x: 0, y: 0 },
    dragTotal: { x: 0, y: 0 },
    down: {
      point: { x: 0, y: 0 },
      time: -1,
    },
    up: {
      point: { x: 0, y: 0 },
      time: -1,
    },
  }

  const move = { x: 0, y: 0 }

  const onMove = (event: PointerEvent): void => {
    move.x = event.x
    move.y = event.y
  }

  const onDown = (event: PointerEvent): void => {
    pointer.down.point.x = event.x
    pointer.down.point.y = event.y
    pointer.down.time = Date.now()
    pointer.isDown = true
  }

  const onUp = (event: PointerEvent): void => {
    pointer.up.point.x = event.x
    pointer.up.point.y = event.y
    pointer.up.time = Date.now()
    pointer.isDown = false
  }

  let loopId = -1
  const loop = () => {
    loopId = requestAnimationFrame(loop)
    const { point, pointOld, delta, isDown, dragDelta } = pointer
    pointOld.x = point.x
    pointOld.y = point.y
    point.x = move.x
    point.y = move.y
    delta.x = point.x - pointOld.x
    delta.y = point.y - pointOld.y
    if (isDown) {
      dragDelta.x += (delta.x - dragDelta.x) * .5
      dragDelta.y += (delta.y - dragDelta.y) * .5
    } else {
      dragDelta.x *= .95
      dragDelta.y *= .95
    }
  }
  
  element.addEventListener('pointermove', onMove)
  element.addEventListener('pointerdown', onDown)
  element.addEventListener('pointerup', onUp)
  loopId = requestAnimationFrame(loop)
  
  const destroy = () => {
    element.removeEventListener('pointermove', onMove)
    element.removeEventListener('pointerdown', onDown)
    element.removeEventListener('pointerup', onUp)
    cancelAnimationFrame(loopId)
  }

  return {
    pointer,
    destroy,
  }
}

export const getPointer = (target: HTMLElement | string) => {

  if (map.has(target) === false) {
    const targetElement = typeof target === 'string' 
      ? (document.querySelector(target) as HTMLElement) 
      : target

    map.set(target, watch(targetElement))
  }

  return map.get(target).pointer
}

export const releasePointer = (target: HTMLElement | string) => {
  map.get(target)?.destroy()
}
