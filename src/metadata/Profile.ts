import { Metadata } from './Metadata'
import { Type } from 'serializer.ts/Decorators'
import { Mergeable } from './Mergeable';

type SessionSecurityLevel = 'LOW' | 'STANDARD' | 'HIGH_ASSURANCE'
type FormFactor = 'Small' | 'Medium' | 'Large'
type ActionOverrideType = 'Default' | 'Standard' | 'Scontrol' | 'Visualforce' | 'Flexipage' | 'LightningComponent'
type CategoryGroupVisibility = 'ALL' | 'NONE' | 'CUSTOM'
type TabVisibility = 'Hidden' | 'DefaultOff' | 'DefaultOn'

export class Profile extends Metadata {
    @Type(() => ProfileApplicationVisibility)
    applicationVisibilities?: ProfileApplicationVisibility[]
    @Type(() => ProfileCategoryGroupVisibility)
    categoryGroupVisibilities?: ProfileCategoryGroupVisibility[]
    @Type(() => ProfileApexClassAccess)
    classAccesses?: ProfileApexClassAccess[]
    custom?: boolean
    @Type(() => ProfileCustomPermissions)
    customPermissions?: ProfileCustomPermissions[]
    description?: string
    @Type(() => ProfileExternalDataSourceAccess)
    externalDataSourceAccesses?: ProfileExternalDataSourceAccess[]
    @Type(() => ProfileFieldLevelSecurity)
    fieldPermissions?: ProfileFieldLevelSecurity[]
    @Type(() => ProfileLayoutAssignment)
    layoutAssignments?: ProfileLayoutAssignment[]
    @Type(() => ProfileLoginHours)
    loginHours?: ProfileLoginHours
    @Type(() => ProfileLoginIpRange)
    loginIpRanges?: ProfileLoginIpRange[]
    @Type(() => ProfileObjectPermissions)
    objectPermissions?: ProfileObjectPermissions[]
    @Type(() => ProfileApexPageAccess)
    pageAccesses?: ProfileApexPageAccess[]
    @Type(() => ProfileActionOverride)
    profileActionOverrides?: ProfileActionOverride[]
    @Type(() => ProfileRecordTypeVisibility)
    recordTypeVisibilities?: ProfileRecordTypeVisibility[]
    @Type(() => ProfileTabVisibility)
    tabVisibilities?: ProfileTabVisibility[]
    userLicense?: string
    @Type(() => ProfileUserPermission)
    userPermissions?: ProfileUserPermission[]
}
export class ProfileActionOverride implements Mergeable{
    actionName!: string
    content?: string
    formFactor!: FormFactor
    pageOrSobjectType!: string
    recordType?: string
    type!: ActionOverrideType
    key() {
      return this.pageOrSobjectType + '.' + this.recordType
    }
    isSorted() { return true; }

}
export class ProfileApplicationVisibility implements Mergeable{
    application!: string
    default!: boolean
    visible!: boolean
    key() {
      return this.application
    }
    isSorted() { return true; }
}
export class ProfileCategoryGroupVisibility implements Mergeable{
    dataCategories?: string[]
    dataCategoryGroup!: string
    visibility!: CategoryGroupVisibility
    key() {
      return this.dataCategoryGroup
    }
    isSorted() { return true; }
}
export class ProfileApexClassAccess implements Mergeable{
    apexClass!: string
    enabled!: boolean
    key() {
      return this.apexClass
    }
    isSorted() { return true; }
}
export class ProfileCustomPermissions implements Mergeable{
    enabled!: boolean
    name!: string
    key() {
      return this.name
    }
    isSorted() { return true; }
}
export class ProfileExternalDataSourceAccess implements Mergeable{
    enabled!: boolean
    externalDataSource!: string
    key() {
      return this.externalDataSource
    }
    isSorted() { return true; }
}
export class ProfileFieldLevelSecurity implements Mergeable{
    editable!: boolean
    field!: string
    readable?: boolean
    key() {
      return this.field
    }
    isSorted() { return true; }
}
export class ProfileLayoutAssignment implements Mergeable{
    layout!: string
    recordType?: string
    key() {
      return this.layout+'.'+this.recordType
    }
    isSorted() { return true; }
}
export class ProfileLoginHours{
    fridayEnd?: string
    fridayStart?: string
    mondayEnd?: string
    mondayStart?: string
    saturdayEnd?: string
    saturdayStart?: string
    sundayEnd?: string
    sundayStart?: string
    thursdayEnd?: string
    thursdayStart?: string
    tuesdayEnd?: string
    tuesdayStart?: string
    wednesdayEnd?: string
    wednesdayStart?: string
}
export class ProfileLoginIpRange {
    description?: string
    endAddress!: string
    startAddress!: string
}
export class ProfileApexPageAccess implements Mergeable{
    apexPage!: string
    enabled!: boolean
    key() {
      return this.apexPage
    }
    isSorted() { return true; }
}
export class ProfileRecordTypeVisibility implements Mergeable{
    default!: boolean
    personAccountDefault?: boolean
    recordType!: string
    visible!: boolean
    key() {
      return this.recordType
    }
    isSorted() { return true; }
}
export class ProfileTabVisibility implements Mergeable{
    tab!: string
    visibility!: TabVisibility
    key() {
      return this.tab
    }
    isSorted() { return true; }
}
export class ProfileUserPermission implements Mergeable{
    enabled!: boolean
    name!: string
    key() {
      return this.name
    }
    isSorted() { return true; }
}
export class ProfilePasswordPolicy extends Metadata{
    forgotPasswordRedirect?: boolean
    lockoutInterval!: number
    maxLoginAttempts!: number
    minimumPasswordLength!: number
    minimumPasswordLifetime?: boolean
    obscure?: boolean
    passwordComplexity!: number
    passwordExpiration!: number
    passwordHistory!: number
    passwordQuestion!: number
    profile!: string
}
export class ProfileSessionSetting extends Metadata{
    externalCommunityUserIdentityVerif!: boolean
    forceLogout!: boolean
    profile!: string
    requiredSessionLevel?: SessionSecurityLevel
    sessionPersistence!: boolean
    sessionTimeout!: number
    sessionTimeoutWarning!: boolean
}
export class ProfileObjectPermissions implements Mergeable{
    allowCreate?: boolean
    allowDelete?: boolean
    allowEdit?: boolean
    allowRead?: boolean
    modifyAllRecords?: boolean
    object!: string
    viewAllRecords?: boolean
    key() {
      return this.object
    }
    isSorted() { return true; }
}
