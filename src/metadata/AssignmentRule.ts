import { Metadata } from './Metadata'
import { Type } from 'serializer.ts/Decorators'
import { FilterItem } from './FilterItem';

type AssignToLookupValueType = 'User' | 'Queue'
type BusinessHoursSourceType = 'None' | 'Case' | 'Static'
type EscalationStartTimeType = 'CaseCreation' | 'CaseLastModified'

export class AssignmentRule extends Metadata {
    active?: boolean
    @Type(() => RuleEntry)
    ruleEntry?: RuleEntry[]

}
export class RuleEntry {
    assignedTo?: string
    assignedToType?: AssignToLookupValueType
    booleanFilter?: string
    businessHours?: string
    businessHoursSource?: BusinessHoursSourceType
    @Type(() => FilterItem)
    criteriaItems?: FilterItem[]
    disableEscalationWhenModified?: boolean
    @Type(() => EscalationAction)
    escalationAction?: EscalationAction[]
    escalationStartTime?: EscalationStartTimeType
    formula?: string
    notifyCcRecipients?: boolean
    overrideExistingTeams?: boolean
    replyToEmail?: string
    senderEmail?: string
    senderName?: string
    team?: string[]
    template?: string
}
export class EscalationAction {
    assignedTo?: string
    assignedToTemplate?: string
    assignedToType?: AssignToLookupValueType
    minutesToEscalation?: number
    notifyCaseOwner?: boolean
    notifyEmail?: string[]
    notifyTo?: string
    notifyToTemplate?: string
}
export class AssignmentRules extends Metadata {
    @Type(() => AssignmentRule)
    assignmentRule?: AssignmentRule[]
}
