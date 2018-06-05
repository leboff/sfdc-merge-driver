export type FilterOperation = 'equals' | 'notEqual' | 'lessThan' | 'greaterThan' | 'lessOrEqual' | 'greaterOrEqual' | 'contains' | 'notContain' | 'startsWith' | 'includes' | 'excludes' | 'within'

export class FilterItem {
  field!: string
  operation!: FilterOperation
  value?: string
  valueField?: string
  constructor(data: FilterItem) {
      Object.assign(this, data)
  }
}
