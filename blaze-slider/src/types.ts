export type AllRequired<T> = Required<T> & {
  [K in keyof T]: T[K] extends object ? AllRequired<T[K]> : Required<T[K]>
}

export type AllPartial<T> = {
  [K in keyof T]?: T[K] extends object ? AllPartial<T[K]> : T[K]
}

export type Config = {
  threshold?: number
  slides?: {
    loop?: boolean
    show?: number
    scroll?: number
    gap?: number
    draggable?: boolean
  }
  navigation?:
    | {
        prev: HTMLElement
        next: HTMLElement
      }
    | false
  pagination?: HTMLElement | false
  transition?: {
    timingFunction?: string
    duration?: string
  }
  autoplay?: {
    enabled?: boolean
    interval?: number
    toLeft?: boolean
    stopOnInteraction?: boolean
    pauseOnHover?: boolean
  }
}

export type BlazeSettings = {
  media: {
    [K: string]: Config
  }
}
