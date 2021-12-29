import { defaultConfig } from '../defaultConfig'
import { BlazeSettings } from '../types'
import { deepClone, override } from '../utils'

export function createConfig (blazeSettings?: BlazeSettings) {
  const config = deepClone(defaultConfig)

  // override responsive stuff
  if (blazeSettings) {
    Object.keys(blazeSettings.media).forEach((mediaKey) => {
      if (window.matchMedia(mediaKey).matches) {
        override(config, blazeSettings.media[mediaKey])
      }
    })
  }

  return config
}
