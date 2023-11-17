import { BASE_CURRENT_VERSION } from '@monospace/base'
import { BaseAveMujica } from '@monospace/base/src/utils'

import {
  asd,
  Lier,
  type Lire,
  type CCD,
} from '@monospace/openapp/src/deep/absolute-import'

import {
  Pad,
  Cpe,
  Opsd,
  CDCD,
} from './deep/relative-import'

export { Gundam } from '@monospace/base'
export { Gridman } from '@monospace/base/src/component'

export type C1 =
  | typeof asd
  | typeof Lier
  | Lire
  | CCD
  | typeof BASE_CURRENT_VERSION

export type C2 =
  | typeof Pad
  | typeof Cpe
  | Opsd
  | CDCD
  | typeof BaseAveMujica

export type C3 = ''
