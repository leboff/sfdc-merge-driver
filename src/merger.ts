import {
  Mergeable,
  KeyedMergeable,
  isMergeable
} from "./metadata/Mergeable";
import * as _ from 'lodash'
const getValues = function (km: KeyedMergeable, sort: boolean = true): Mergeable[] {
  return sort ? _.sortBy(_.values(km), (val) => val.isSorted() && val.key()) : _.values(km)
}

export class Merge {
  conflictCount: number = 0;
  base: Mergeable;
  current: Mergeable;
  other: Mergeable;
  constructor(base: Mergeable, current: Mergeable, other: Mergeable) {
    this.base = base;
    this.current = current;
    this.other = other;
  }

  merge(): Mergeable {
    _.forOwn(this.current, (currentVals, key: any) => {
      const baseVals = this.base[key];
      const otherVals = this.other[key];
      //if its mergeable.. we're going to key by and send to _merge
      if (_.isArray(currentVals)) {
        if (isMergeable(currentVals[0])) {
          const baseKeyed: KeyedMergeable = new KeyedMergeable(baseVals)
          const currentKeyed: KeyedMergeable = new KeyedMergeable(currentVals)
          const otherKeyed: KeyedMergeable = new KeyedMergeable(otherVals)

          this.current[key] = getValues(this._merge(baseKeyed, currentKeyed, otherKeyed), this.current.isSorted())
          this.other[key] = getValues(otherKeyed, this.other.isSorted())

        }
      }
    });
    return this.current;
  }
  _merge(base: any, current: any, other: any) {
    let currentResult: any = _.clone(other);

    _.forEach(other, (otherVal, key: any) => {
      if (!_.has(current, key)) {
        //current doesn't have this value
        if (_.isEqual(base[key], otherVal)) {
          //removed in current remove unmodified in other
          //from current result and base result
          delete currentResult[key]
          delete other[key];
        }
      }
    })

    _.forEach(current, (currentVal, key: any) => {

      const baseVal = base[key]
      const otherVal = other[key]

      if (!_.has(other, key)) {
        //if other does not have this key
        if (!_.has(base, key)) {
          //and base does not have this key
          //then this was an addition, resolve
          other[key] = currentVal
          currentResult[key] = currentVal
        } else {
          //removed in other
          // if(!_.isEqual(currentVal, baseVal)){
          //   console.log('removed in other modified in current');
          //   //modified in current
          //   this.conflictCount++;
          //   // other[key] = currentVal
          //   currentResult[key] = currentVal
          // }
        }
      } else if (!_.isEqual(otherVal, currentVal)) {
        if (isMergeable(currentVal)) {
          currentResult[key] = new Merge(baseVal || {}, currentVal, otherVal || {}).merge();
        }
        if (typeof currentVal === 'object' && typeof otherVal === 'object') {
          currentResult[key] = this._merge(_.has(base, key) && typeof baseVal === 'object' ? baseVal : {}, currentVal, otherVal)
        } else {
          if (_.isEqual(otherVal, baseVal)) {
            //only current val changed, take it
            other[key] = currentVal
            currentResult[key] = currentVal
          } else if (!_.isEqual(currentVal, baseVal)) {
            this.conflictCount++;
            //we have a conflict, keep original val
            currentResult[key] = currentVal
          }
        }
      }
    })
    return currentResult;
  }

}
