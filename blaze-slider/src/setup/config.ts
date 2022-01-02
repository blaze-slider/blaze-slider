import { defaultConfig } from '../config/defaultConfig'
import { deepClone, override } from '../config/utils'
import { BlazeSettings } from '../types'

export function createConfig(blazeSettings?: BlazeSettings) {
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
