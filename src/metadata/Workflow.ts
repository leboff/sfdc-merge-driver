import { Metadata } from './Metadata'
import { Type } from 'serializer.ts/Decorators'
import { FilterItem } from './FilterItem';

type ActionEmailSenderType = 'CurrentUser' | 'OrgWideEmailAddress' | 'DefaultWorkflowUser'
type LookupValueType = 'User' | 'Queue' | 'RecordType'
type FieldUpdateOperation = 'Formula' | 'Literal' | 'Null' | 'NextValue' | 'PreviousValue' | 'LookupValue'
type KnowledgeWorkflowAction = 'PublishAsNew' | 'Publish'
type SendAction = 'Send'
type ActionTaskAssignedToTypes = 'user' | 'role' | 'opportunityTeam' | 'accountTeam' | 'owner' | 'accountOwner' | 'creator' | 'accountCreator' | 'partnerUser' | 'portalRole'
type ActionEmailRecipientTypes = 'group' | 'role' | 'user' | 'opportunityTeam' | 'accountTeam' | 'roleSubordinates' | 'owner' | 'creator' | 'partnerUser' | 'accountOwner' | 'customerPortalUser' | 'portalRole' | 'portalRoleSubordinates' | 'contactLookup' | 'userLookup' | 'roleSubordinatesInternal' | 'email' | 'caseTeam' | 'campaignMemberDerivedOwner'
type WorkflowActionType = 'FieldUpdate' | 'KnowledgePublish' | 'Task' | 'Alert' | 'Send' | 'OutboundMessage' | 'FlowAction'
type WorkflowTimeUnits = 'Hours' | 'Days'
type WorkflowTriggerTypes = 'onCreateOnly' | 'onCreateOrTriggeringUpdate' | 'onAllChanges' | 'OnRecursiveUpdate'

export class Workflow extends Metadata {
    @Type(() => WorkflowAlert)
    alerts?: WorkflowAlert[]
    @Type(() => WorkflowFieldUpdate)
    fieldUpdates?: WorkflowFieldUpdate[]
    @Type(() => WorkflowFlowAction)
    flowActions?: WorkflowFlowAction[]
    @Type(() => WorkflowKnowledgePublish)
    knowledgePublishes?: WorkflowKnowledgePublish[]
    @Type(() => WorkflowOutboundMessage)
    outboundMessages?: WorkflowOutboundMessage[]
    @Type(() => WorkflowRule)
    rules?: WorkflowRule[]
    @Type(() => WorkflowSend)
    send?: WorkflowSend[]
    @Type(() => WorkflowTask)
    tasks?: WorkflowTask[]
}
export class WorkflowAction extends Metadata {
}
export class WorkflowAlert extends WorkflowAction {
    ccEmails?: string[]
    description!: string
    protected!: boolean
    @Type(() => WorkflowEmailRecipient)
    recipients?: WorkflowEmailRecipient[]
    senderAddress?: string
    senderType?: ActionEmailSenderType
    template!: string
}
export class WorkflowFieldUpdate extends WorkflowAction {
    description?: string
    field!: string
    formula?: string
    literalValue?: string
    lookupValue?: string
    lookupValueType?: LookupValueType
    name!: string
    notifyAssignee!: boolean
    operation!: FieldUpdateOperation
    protected!: boolean
    reevaluateOnChange?: boolean
    targetObject?: string
}
export class WorkflowFlowAction extends WorkflowAction {
    description?: string
    flow!: string
    @Type(() => WorkflowFlowActionParameter)
    flowInputs?: WorkflowFlowActionParameter[]
    label!: string
    language?: string
    protected!: boolean
}
export class WorkflowFlowActionParameter {
    name!: string
    value?: string
}
export class WorkflowKnowledgePublish extends WorkflowAction {
    action!: KnowledgeWorkflowAction
    description?: string
    label!: string
    language?: string
    protected!: boolean
}
export class WorkflowOutboundMessage extends WorkflowAction {
    apiVersion!: number
    description?: string
    endpointUrl!: string
    fields?: string[]
    includeSessionId!: boolean
    integrationUser!: string
    name!: string
    protected!: boolean
    useDeadLetterQueue?: boolean
}
export class WorkflowSend extends WorkflowAction {
    action!: SendAction
    description?: string
    label!: string
    language?: string
    protected!: boolean
}
export class WorkflowTask extends WorkflowAction {
    assignedTo?: string
    assignedToType!: ActionTaskAssignedToTypes
    description?: string
    dueDateOffset!: number
    notifyAssignee!: boolean
    offsetFromField?: string
    priority!: string
    protected!: boolean
    status!: string
    subject!: string
}
export class WorkflowEmailRecipient {
    field?: string
    recipient?: string
    type!: ActionEmailRecipientTypes
}
export class WorkflowRule extends Metadata {
    @Type(() => WorkflowActionReference)
    actions?: WorkflowActionReference[]
    active!: boolean
    booleanFilter?: string
    @Type(() => FilterItem)
    criteriaItems?: FilterItem[]
    description?: string
    formula?: string
    triggerType!: WorkflowTriggerTypes
    @Type(() => WorkflowTimeTrigger)
    workflowTimeTriggers?: WorkflowTimeTrigger[]
}
export class WorkflowTimeTrigger {
    @Type(() => WorkflowActionReference)
    actions?: WorkflowActionReference[]
    offsetFromField?: string
    timeLength?: string
    workflowTimeTriggerUnit!: WorkflowTimeUnits
}
export class WorkflowActionReference {
    name!: string
    type!: WorkflowActionType
    constructor(data: WorkflowActionReference) {
        Object.assign(this, data)
    }
}
