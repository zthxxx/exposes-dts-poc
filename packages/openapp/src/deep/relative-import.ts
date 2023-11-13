import { type BaseType } from './types'

export const Pad = 'sdg'

const a4 = 'acc'

export const Cpe = {
  a4,
}

export type Opsd = BaseType | {
  opsd: Number
}

export interface CDCD {
  cdcd: Opsd | number
}

