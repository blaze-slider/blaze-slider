export type AllRequired<T> = Required<T> & {
  [K in keyof T]: T[K] extends object ? AllRequired<T[K]> : Required<T[K]>;
};

export type AllPartial<T> = {
  [K in keyof T]?: T[K] extends object ? AllPartial<T[K]> : T[K];
};

export type Config = {
  slides?: {
    show?: number;
    scroll?: number;
    gap?: string;
  };
  transition?: {
    timingFunction?: string;
    duration?: string;
  };
  autoplay?: {
    enabled?: boolean;
    interval?: number;
    toLeft?: boolean;
    stopOnInteraction?: boolean;
    pauseOnHover?: boolean;
  };
};

export type RootConfig = {
  media: {
    [K: string]: Config;
  };
};
