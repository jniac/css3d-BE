
class Point {
  x = 0
  y = 0
  z = 0
  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z)
  }
  set(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }
  scale(s: number) {
    this.x *= s
    this.y *= s
    this.z *= s
  }
}

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
  wheelDelta: Point
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
    point: new Point(),
    delta: new Point(),
    pointOld: new Point(),
    dragDelta: new Point(),
    dragTotal: new Point(),
    wheelDelta: new Point(),
    down: {
      point: new Point(),
      time: -1,
    },
    up: {
      point: new Point(),
      time: -1,
    },
  }

  const move = new Point()

  const onMove = (event: PointerEvent) => {
    move.x = event.x
    move.y = event.y
  }

  const onDown = (event: PointerEvent) => {
    pointer.down.point.x = event.x
    pointer.down.point.y = event.y
    pointer.down.time = Date.now()
    pointer.isDown = true
  }

  const onUp = (event: PointerEvent) => {
    pointer.up.point.x = event.x
    pointer.up.point.y = event.y
    pointer.up.time = Date.now()
    pointer.isDown = false
  }

  const onWheel = (event: WheelEvent) => {
    pointer.wheelDelta.set(event.deltaX, event.deltaY, event.deltaZ)
  }

  let loopId = -1
  const loop = () => {
    loopId = requestAnimationFrame(loop)
    const { point, pointOld, delta, isDown, dragDelta, wheelDelta } = pointer
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
      dragDelta.scale(.95)
    }
    wheelDelta.scale(.9)
  }
  
  element.addEventListener('pointermove', onMove)
  element.addEventListener('pointerdown', onDown)
  element.addEventListener('pointerup', onUp)
  element.addEventListener('wheel', onWheel)
  loopId = requestAnimationFrame(loop)
  
  const destroy = () => {
    element.removeEventListener('pointermove', onMove)
    element.removeEventListener('pointerdown', onDown)
    element.removeEventListener('pointerup', onUp)
    element.removeEventListener('wheel', onWheel)
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
