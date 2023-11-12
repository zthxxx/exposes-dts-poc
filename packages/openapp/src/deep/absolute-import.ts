import { type BaseType } from '@monospace/openapp/src/deep/types'
/**
 * this import of `imported-but-not-export` will not occur in d.ts
 * but `imported-but-not-export.d.ts` will be generated
 */
import { TTK, KLBq } from '@monospace/openapp/src/deep/imported-but-not-export'
import { TTy } from '@monospace/openapp/src/deep/export-index'

export const asd = 'sdg'

const acc = 'acc'

const klbQ: KLBq = TTK
console.log('use klbQ:', klbQ)

export const Lier = {
  acc,
  tty: TTy.TTY1,
}

export type Lire = BaseType |  {
  lire: Number
}

export interface CCD {
  ccd: Lire | number
}

