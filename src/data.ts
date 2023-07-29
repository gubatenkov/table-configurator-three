export const initialConfig = {
  tablelegs: {
    textureRepeatY: 1,
    textureRepeatX: 1,
    color: '#000000',
    style: 'square',
    texture: '',
    height: 4,
    size: 0.4,
  },
  countertop: {
    textureRepeatY: 1,
    textureRepeatX: 1,
    color: '#723e1c',
    texture: '',
    depth: 0.1,
    height: 8,
    width: 10,
  },
}

export type Config = typeof initialConfig
export type CountertopSettings = typeof initialConfig.countertop
export type TablelegsSettings = typeof initialConfig.tablelegs
export type ConfigKey = keyof Config
export type ConfigValue = Config[keyof Config]
