import { type BaseType } from './types'
/**
 * this import of `imported-but-not-export` will not occur in d.ts
 * but `imported-but-not-export.d.ts` will be generated
 */
import { TTK, KLBq } from './imported-but-not-export'
import { TTy } from './export-index'

export const Pad = 'sdg'

const a4 = 'acc'

const klbQ: KLBq = TTK
console.log('use klbQ:', klbQ)

export const Cpe = {
  a4,
  tty: TTy.TTY1,
}

export type Opsd = BaseType | {
  opsd: Number
}

export interface CDCD {
  cdcd: Opsd | number
}

export enum GF {
  A1 = 'Picture',
}

