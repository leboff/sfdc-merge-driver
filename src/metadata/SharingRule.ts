import { Metadata } from './Metadata'
import { Type } from 'serializer.ts/Decorators'
import { FilterItem } from './FilterItem';

export class SharingBaseRule extends Metadata {
    accessLevel!: string
    @Type(() => AccountSharingRuleSettings)
    accountSettings?: AccountSharingRuleSettings
    description?: string
    label!: string
    @Type(() => SharedTo)
    sharedTo!: SharedTo
}
export class AccountSharingRuleSettings {
    caseAccessLevel!: string
    contactAccessLevel!: string
    opportunityAccessLevel!: string
    constructor(data: AccountSharingRuleSettings) {
        Object.assign(this, data)
    }
}
export class SharingCriteriaRule extends SharingBaseRule {
    booleanFilter?: string
    @Type(() => FilterItem)
    criteriaItems?: FilterItem[]
}
export class SharingOwnerRule extends SharingBaseRule {
    @Type(() => SharedTo)
    sharedFrom!: SharedTo
}
export class SharingTerritoryRule extends SharingOwnerRule {
}
export class SharingRules extends Metadata {
    @Type(() => SharingCriteriaRule)
    sharingCriteriaRules?: SharingCriteriaRule[]
    @Type(() => SharingOwnerRule)
    sharingOwnerRules?: SharingOwnerRule[]
    @Type(() => SharingTerritoryRule)
    sharingTerritoryRules?: SharingTerritoryRule[]
}
export class SharingSet extends Metadata {
    @Type(() => AccessMapping)
    accessMappings?: AccessMapping[]
    description?: string
    name!: string
    profiles?: string[]
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
export class AccessMapping {
    accessLevel!: string
    object!: string
    objectField!: string
    userField!: string
}
