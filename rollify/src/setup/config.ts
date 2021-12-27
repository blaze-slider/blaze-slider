import { defaultConfig } from '../defaultConfig'
import { RootConfig } from '../types'
import { deepClone, override } from '../utils'

export function createConfig (givenConfig?: RootConfig) {
  const config = deepClone(defaultConfig)

  // override responsive stuff
  if (givenConfig) {
    Object.keys(givenConfig.media).forEach((mediaKey) => {
      if (window.matchMedia(mediaKey).matches) {
        override(config, givenConfig.media[mediaKey])
      }
    })
  }

  return config
}
