import { Metadata } from './Metadata';
import { Type } from 'serializer.ts/Decorators';

type ForecastCategories =  "Omitted" | "Pipeline" | "BestCase" | "Forecast" | "Closed" ;

export class CustomValue extends Metadata {
  color?: string ;
  default!: boolean ;
  description?: string ;
  isActive?: boolean ;
  label?: string ;
}
export class StandardValue extends CustomValue {
  allowEmail?: boolean ;
  closed?: boolean ;
  converted?: boolean ;
  cssExposed?: boolean ;
  forecastCategory?: ForecastCategories ;
  groupingString?: string ;
  highPriority?: boolean ;
  probability?: number ;
  reverseRole?: string ;
  reviewed?: boolean ;
  won?: boolean ;
}

export class StandardValueSet extends Metadata {
  groupingStringEnum?: string ;
  sorted!: boolean ;
  @Type(() => StandardValue)
  standardValue?: StandardValue [];
}

export class ValueTranslation {
  masterLabel!: string ;
  translation?: string ;
}
export class StandardValueSetTranslation extends Metadata {
  @Type(() => ValueTranslation)
  valueTranslation?: ValueTranslation [];
}

export class GlobalValueSet extends Metadata {
  @Type(() => CustomValue)
  customValue?: CustomValue [];
  description?: string ;
  masterLabel!: string ;
  sorted!: boolean ;
}
