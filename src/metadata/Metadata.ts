
import { Mergeable } from './Mergeable'
export class Metadata implements Mergeable{
  fullName: string = ''

  constructor(name: string) {
    this.fullName = name;
  }

  key() {
    return this.fullName;
  }

  isSorted() {
    return true;
  }
}
