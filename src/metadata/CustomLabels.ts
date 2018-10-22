import { Metadata } from './Metadata'
import { Type } from 'serializer.ts/Decorators'

export class CustomLabel extends Metadata {
  categories?: string ;
  language!: string ;
  protected!: boolean ;
  shortDescription!: string ;
  value!: string ;
}
export class CustomLabels extends Metadata {
  @Type(() => CustomLabel)
  labels?: CustomLabel [];
}
