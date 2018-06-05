import * as _ from 'lodash'

export interface Mergeable {
  [index: string]: any
  key: () => string
  isSorted: () => boolean
}
export class KeyedMergeable {
  [index: string]: Mergeable
  constructor(mergeable: Mergeable[]) {
    Object.assign(this, _.keyBy(mergeable, (val) => val.key()))
  }

}
export function isMergeable(val: Mergeable): val is Mergeable {
  return val && (<Mergeable>val).key !== undefined;
}

