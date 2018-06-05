import { Metadata } from './Metadata';
import { Type } from 'serializer.ts/Decorators'
import { FilterItem, FilterOperation } from './FilterItem';
import { Mergeable } from './Mergeable';

type FormFactor = 'Small' | 'Medium' | 'Large'
type Channel = 'AllChannels' | 'App' | 'Pkb' | 'Csp' | 'Prm'
type Template = 'Page' | 'Tab' | 'Toc'
type ActionOverrideType = 'Default' | 'Standard' | 'Scontrol' | 'Visualforce' | 'Flexipage' | 'LightningComponent'
type ForecastCategories = 'Omitted' | 'Pipeline' | 'BestCase' | 'Forecast' | 'Closed'
type CustomSettingsType = 'List' | 'Hierarchy'
type DeploymentStatus = 'InDevelopment' | 'Deployed'
type PlatformEventType = 'HighVolume' | 'StandardVolume'
type SharingModel = 'Private' | 'Read' | 'ReadSelect' | 'ReadWrite' | 'ReadWriteTransfer' | 'FullAccess' | 'ControlledByParent' | 'ControlledByLeadOrContact' | 'ControlledByCampaign'
type Gender = 'Neuter' | 'Masculine' | 'Feminine' | 'AnimateMasculine'
type StartsWith = 'Consonant' | 'Vowel' | 'Special'
type SetupObjectVisibility = 'Protected' | 'Public'
type DeleteConstraint = 'Cascade' | 'Restrict' | 'SetNull'
type FieldManageability = 'DeveloperControlled' | 'SubscriberControlled' | 'Locked'
type TreatBlanksAs = 'BlankAsBlank' | 'BlankAsZero'
type EncryptedFieldMaskChar = 'asterisk' | 'X'
type EncryptedFieldMaskType = 'all' | 'creditCard' | 'ssn' | 'lastFour' | 'sin' | 'nino'
type SecurityClassification = 'AccountInformation' | 'ConfigurationAndUsageData' | 'DataIntendedToBePublic' | 'BusinessSetupDataBusinessDataAndAggregates' | 'AssociativeBusinessOrPersonalData' | 'AuthenticationData'
type SummaryOperations = 'count' | 'sum' | 'min' | 'max'
type FieldType = 'AutoNumber' | 'Lookup' | 'MasterDetail' | 'Checkbox' | 'Currency' | 'Date' | 'DateTime' | 'Email' | 'Number' | 'Percent' | 'Phone' | 'Picklist' | 'MultiselectPicklist' | 'Text' | 'TextArea' | 'LongTextArea' | 'Html' | 'Url' | 'EncryptedText' | 'Summary' | 'Hierarchy' | 'File' | 'MetadataRelationship' | 'Location' | 'ExternalLookup' | 'IndirectLookup' | 'CustomDataType' | 'Time'
type FilterScope = 'Everything' | 'Mine' | 'Queue' | 'Delegated' | 'MyTerritory' | 'MyTeamTerritory' | 'Team' | 'AssignedToMe'
type Language = 'en_US' | 'de' | 'es' | 'fr' | 'it' | 'ja' | 'sv' | 'ko' | 'zh_TW' | 'zh_CN' | 'pt_BR' | 'nl_NL' | 'da' | 'th' | 'fi' | 'ru' | 'es_MX' | 'no' | 'hu' | 'pl' | 'cs' | 'tr' | 'in' | 'ro' | 'vi' | 'uk' | 'iw' | 'el' | 'bg' | 'en_GB' | 'ar' | 'sk' | 'pt_PT' | 'hr' | 'sl' | 'fr_CA' | 'ka' | 'sr' | 'sh' | 'en_AU' | 'en_MY' | 'en_IN' | 'en_PH' | 'en_CA' | 'ro_MD' | 'bs' | 'mk' | 'lv' | 'lt' | 'et' | 'sq' | 'sh_ME' | 'mt' | 'ga' | 'eu' | 'cy' | 'is' | 'ms' | 'tl' | 'lb' | 'rm' | 'hy' | 'hi' | 'ur' | 'bn' | 'de_AT' | 'de_CH' | 'ta' | 'ar_DZ' | 'ar_BH' | 'ar_EG' | 'ar_IQ' | 'ar_JO' | 'ar_KW' | 'ar_LB' | 'ar_LY' | 'ar_MA' | 'ar_OM' | 'ar_QA' | 'ar_SA' | 'ar_SD' | 'ar_SY' | 'ar_TN' | 'ar_AE' | 'ar_YE' | 'zh_SG' | 'zh_HK' | 'en_HK' | 'en_IE' | 'en_SG' | 'en_ZA' | 'fr_BE' | 'fr_LU' | 'fr_CH' | 'de_BE' | 'de_LU' | 'it_CH' | 'nl_BE' | 'es_AR' | 'es_BO' | 'es_CL' | 'es_CO' | 'es_CR' | 'es_DO' | 'es_EC' | 'es_SV' | 'es_GT' | 'es_HN' | 'es_NI' | 'es_PA' | 'es_PY' | 'es_PE' | 'es_PR' | 'es_US' | 'es_UY' | 'es_VE' | 'ca' | 'eo' | 'iw_EO'
type WebLinkAvailability = 'online' | 'offline'
type WebLinkDisplayType = 'link' | 'button' | 'massActionButton'
type Encoding = 'UTF-8' | 'ISO-8859-1' | 'Shift_JIS' | 'ISO-2022-JP' | 'EUC-JP' | 'ks_c_5601-1987' | 'Big5' | 'GB2312' | 'Big5-HKSCS' | 'x-SJIS_0213'
type WebLinkType = 'url' | 'sControl' | 'javascript' | 'page' | 'flow'
type WebLinkWindowType = 'newWindow' | 'sidebar' | 'noSidebar' | 'replace' | 'onClickJavaScript'
type WebLinkPosition = 'fullScreen' | 'none' | 'topLeft'

export class CustomObject extends Metadata {
  @Type(() => ActionOverride)
  actionOverrides?: ActionOverride[]
  allowInChatterGroups?: boolean
  @Type(() => ArticleTypeChannelDisplay)
  articleTypeChannelDisplay?: ArticleTypeChannelDisplay
  @Type(() => BusinessProcess)
  businessProcesses?: BusinessProcess[]
  compactLayoutAssignment?: string
  @Type(() => CompactLayout)
  compactLayouts?: CompactLayout[]
  customHelp?: string
  customHelpPage?: string
  customSettingsType?: CustomSettingsType
  dataStewardGroup?: string
  dataStewardUser?: string
  deploymentStatus?: DeploymentStatus
  deprecated?: boolean
  description?: string
  enableActivities?: boolean
  enableBulkApi?: boolean
  enableChangeDataCapture?: boolean
  enableDivisions?: boolean
  enableEnhancedLookup?: boolean
  enableFeeds?: boolean
  enableHistory?: boolean
  enableReports?: boolean
  enableSearch?: boolean
  enableSharing?: boolean
  enableStreamingApi?: boolean
  eventType?: PlatformEventType
  externalDataSource?: string
  externalName?: string
  externalRepository?: string
  externalSharingModel?: SharingModel
  @Type(() => FieldSet)
  fieldSets?: FieldSet[]
  @Type(() => CustomField)
  fields?: CustomField[]
  gender?: Gender
  @Type(() => HistoryRetentionPolicy)
  historyRetentionPolicy?: HistoryRetentionPolicy
  household?: boolean
  @Type(() => Index)
  indexes?: Index[]
  label?: string
  @Type(() => ListView)
  listViews?: ListView[]
  @Type(() => CustomField)
  nameField?: CustomField
  pluralLabel?: string
  recordTypeTrackFeedHistory?: boolean
  recordTypeTrackHistory?: boolean
  @Type(() => RecordType)
  recordTypes?: RecordType[]
  @Type(() => SearchLayouts)
  searchLayouts?: SearchLayouts
  sharingModel?: SharingModel
  @Type(() => SharingReason)
  sharingReasons?: SharingReason[]
  @Type(() => SharingRecalculation)
  sharingRecalculations?: SharingRecalculation[]
  startsWith?: StartsWith
  @Type(() => ValidationRule)
  validationRules?: ValidationRule[]
  visibility?: SetupObjectVisibility
  @Type(() => WebLink)
  webLinks?: WebLink[]

}

export class ActionOverride {
  actionName?: string
  comment?: string
  content?: string
  formFactor?: FormFactor
  skipRecordTypeSelect?: boolean
  type?: ActionOverrideType
}

export class ArticleTypeChannelDisplay {
  @Type(() => ArticleTypeTemplate)
  articleTypeTemplates?: ArticleTypeTemplate[]
}

export class ArticleTypeTemplate {
  channel!: Channel
  page?: string
  template!: Template
}


export class BusinessProcess extends Metadata {
  description?: string
  isActive?: boolean
  @Type(() => PicklistValue)
  values?: PicklistValue[]

}

export class CompactLayout extends Metadata {
  fields?: string[]
  label!: string

}

export class CustomField extends Metadata {
  businessOwnerGroup?: string
  businessOwnerUser?: string
  businessStatus?: string
  caseSensitive?: boolean
  customDataType?: string
  defaultValue?: string
  deleteConstraint?: DeleteConstraint
  deprecated?: boolean
  description?: string
  displayFormat?: string
  encrypted?: boolean
  escapeMarkup?: boolean
  externalDeveloperName?: string
  externalId?: boolean
  fieldManageability?: FieldManageability
  formula?: string
  formulaTreatBlanksAs?: TreatBlanksAs
  inlineHelpText?: string
  isAIPredictionField?: boolean
  isConvertLeadDisabled?: boolean
  isFilteringDisabled?: boolean
  isNameField?: boolean
  isSortingDisabled?: boolean
  label?: string
  length?: number
  @Type(() => LookupFilter)
  lookupFilter?: LookupFilter
  maskChar?: EncryptedFieldMaskChar
  maskType?: EncryptedFieldMaskType
  metadataRelationshipControllingField?: string
  populateExistingRows?: boolean
  precision?: number
  referenceTargetField?: string
  referenceTo?: string
  relationshipLabel?: string
  relationshipName?: string
  relationshipOrder?: number
  reparentableMasterDetail?: boolean
  required?: boolean
  restrictedAdminField?: boolean
  scale?: number
  securityClassification?: SecurityClassification
  startingNumber?: number
  stripMarkup?: boolean
  summarizedField?: string
  @Type(() => FilterItem)
  summaryFilterItems?: FilterItem[]
  summaryForeignKey?: string
  summaryOperation?: SummaryOperations
  trackFeedHistory?: boolean
  trackHistory?: boolean
  trackTrending?: boolean
  type?: FieldType
  unique?: boolean
  @Type(() => ValueSet)
  valueSet?: ValueSet
  visibleLines?: number
  writeRequiresMasterRead?: boolean

}
export class CustomValue extends Metadata {
  color?: string
  default!: boolean
  description?: string
  isActive?: boolean
  label?: string

}
export class FieldSet extends Metadata {
  @Type(() => FieldSetItem)
  availableFields?: FieldSetItem[]
  description!: string
  @Type(() => FieldSetItem)
  displayedFields?: FieldSetItem[]
  label!: string

}
export class FieldSetItem {
  field?: string
  isFieldManaged?: boolean
  isRequired?: boolean
}

export class GlobalPicklistValue extends Metadata {
  color?: string
  default!: boolean
  description?: string
  isActive?: boolean

}

export class HistoryRetentionPolicy {
  archiveAfterMonths!: number
  archiveRetentionYears!: number
  description?: string
}
export class Index extends Metadata {
  @Type(() => IndexField)
  fields?: IndexField[]
  label!: string

}
export class IndexField {
  name!: string
  sortDirection!: string
}
export class ListView extends Metadata {
  booleanFilter?: string
  columns?: string[]
  division?: string
  filterScope!: FilterScope
  @Type(() => ListViewFilter)
  filters?: ListViewFilter[]
  label!: string
  language?: Language
  queue?: string
  @Type(() => SharedTo)
  sharedTo?: SharedTo

}
export class ListViewFilter {
  field!: string
  operation!: FilterOperation
  value?: string
}

export class LookupFilter {
  active!: boolean
  booleanFilter?: string
  description?: string
  errorMessage?: string
  @Type(() => FilterItem)
  filterItems?: FilterItem[]
  infoMessage?: string
  isOptional!: boolean
}
export class PicklistValue extends GlobalPicklistValue {
  allowEmail?: boolean
  closed?: boolean
  controllingFieldValues?: string[]
  converted?: boolean
  cssExposed?: boolean
  forecastCategory?: ForecastCategories
  highPriority?: boolean
  probability?: number
  reverseRole?: string
  reviewed?: boolean
  won?: boolean

}

export class RecordType extends Metadata {
  active!: boolean
  businessProcess?: string
  compactLayoutAssignment?: string
  description?: string
  label!: string
  @Type(() => RecordTypePicklistValue)
  picklistValues?: RecordTypePicklistValue[]

}

export class RecordTypePicklistValue implements Mergeable{
  picklist!: string
  @Type(() => PicklistValue)
  values?: PicklistValue[]
  key() {
    return this.picklist
  }
  isSorted() {
    return true;
  }
}
export class SearchLayouts {
  customTabListAdditionalFields?: string[]
  excludedStandardButtons?: string[]
  listViewButtons?: string[]
  lookupDialogsAdditionalFields?: string[]
  lookupFilterFields?: string[]
  lookupPhoneDialogsAdditionalFields?: string[]
  searchFilterFields?: string[]
  searchResultsAdditionalFields?: string[]
  searchResultsCustomButtons?: string[]
}
export class SharedTo {
  allCustomerPortalUsers?: string
  allInternalUsers?: string
  allPartnerUsers?: string
  channelProgramGroup?: string[]
  channelProgramGroups?: string[]
  group?: string[]
  groups?: string[]
  managerSubordinates?: string[]
  managers?: string[]
  portalRole?: string[]
  portalRoleAndSubordinates?: string[]
  queue?: string[]
  role?: string[]
  roleAndSubordinates?: string[]
  roleAndSubordinatesInternal?: string[]
  roles?: string[]
  rolesAndSubordinates?: string[]
  territories?: string[]
  territoriesAndSubordinates?: string[]
  territory?: string[]
  territoryAndSubordinates?: string[]
}
export class SharingReason extends Metadata {
  label!: string

}
export class SharingRecalculation {
  className!: string
}

export class ValidationRule extends Metadata {
  active!: boolean
  description?: string
  errorConditionFormula!: string
  errorDisplayField?: string
  errorMessage!: string

}

export class ValueSet implements Mergeable{
  controllingField?: string
  restricted?: boolean
  @Type(() => ValueSetValuesDefinition)
  valueSetDefinition?: ValueSetValuesDefinition
  valueSetName?: string
  @Type(() => ValueSettings)
  valueSettings?: ValueSettings[]
  key() {
    return 'valueSet'
  }
  isSorted() {
    return true;
  }
}

export class ValueSettings implements Mergeable{
  controllingFieldValue?: string[]
  valueName!: string
  key() {
    return this.valueName
  }
  isSorted() {
    return true;
  }
}
export class ValueSetValuesDefinition implements Mergeable{
  sorted!: any
  @Type(() => CustomValue)
  value?: CustomValue[]
  key() {
    return 'valueSetDefinition'
  }
  isSorted() {
    // console.log(this.sorted, this.sorted[0], this.sorted[0] === 'true')
    return this.sorted && (this.sorted[0] === 'true');
  }
}
export class WebLink extends Metadata {
  availability!: WebLinkAvailability
  description?: string
  displayType!: WebLinkDisplayType
  encodingKey?: Encoding
  hasMenubar?: boolean
  hasScrollbars?: boolean
  hasToolbar?: boolean
  height?: number
  isResizable?: boolean
  linkType!: WebLinkType
  masterLabel?: string
  openType!: WebLinkWindowType
  page?: string
  position?: WebLinkPosition
  protected!: boolean
  requireRowSelection?: boolean
  scontrol?: string
  showsLocation?: boolean
  showsStatus?: boolean
  url?: string
  width?: number

}
