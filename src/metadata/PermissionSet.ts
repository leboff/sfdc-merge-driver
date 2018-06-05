import { Metadata } from './Metadata'
import { Type } from 'serializer.ts/Decorators'
import { Mergeable } from './Mergeable';

type PermissionSetTabVisibility = 'None' | 'Available' | 'Visible'

export class PermissionSet extends Metadata {
    @Type(() => PermissionSetApplicationVisibility)
    applicationVisibilities?: PermissionSetApplicationVisibility[]
    @Type(() => PermissionSetApexClassAccess)
    classAccesses?: PermissionSetApexClassAccess[]
    @Type(() => PermissionSetCustomPermissions)
    customPermissions?: PermissionSetCustomPermissions[]
    description?: string
    @Type(() => PermissionSetExternalDataSourceAccess)
    externalDataSourceAccesses?: PermissionSetExternalDataSourceAccess[]
    @Type(() => PermissionSetFieldPermissions)
    fieldPermissions?: PermissionSetFieldPermissions[]
    hasActivationRequired?: boolean
    label!: string
    license?: string
    @Type(() => PermissionSetObjectPermissions)
    objectPermissions?: PermissionSetObjectPermissions[]
    @Type(() => PermissionSetApexPageAccess)
    pageAccesses?: PermissionSetApexPageAccess[]
    @Type(() => PermissionSetRecordTypeVisibility)
    recordTypeVisibilities?: PermissionSetRecordTypeVisibility[]
    @Type(() => PermissionSetTabSetting)
    tabSettings?: PermissionSetTabSetting[]
    @Type(() => PermissionSetUserPermission)
    userPermissions?: PermissionSetUserPermission[]

}
export class PermissionSetApplicationVisibility implements Mergeable{
    application!: string
    visible!: boolean

    key(){
        return this.application;
    }
    isSorted() { return true; }
}
export class PermissionSetApexClassAccess implements Mergeable {
    apexClass!: string
    enabled!: boolean
    key(){
        return this.apexClass;
    }
    isSorted() { return true; }

}
export class PermissionSetCustomPermissions implements Mergeable {
    enabled!: boolean
    name!: string
    key() {
        return this.name;
    }
    isSorted() { return true; }

}
export class PermissionSetExternalDataSourceAccess implements Mergeable {
    enabled!: boolean
    externalDataSource!: string
    key() {
        return this.externalDataSource;
    }
    isSorted() { return true; }

}
export class PermissionSetFieldPermissions  implements Mergeable {
    editable!: boolean
    field!: string
    readable?: boolean
    key(){
        return this.field;
    }
    isSorted() { return true; }

}
export class PermissionSetObjectPermissions implements Mergeable {
    allowCreate!: boolean
    allowDelete!: boolean
    allowEdit!: boolean
    allowRead!: boolean
    modifyAllRecords!: boolean
    object!: string
    viewAllRecords!: boolean
    key(){
        return this.object;
    }
    isSorted() { return true; }

}
export class PermissionSetApexPageAccess implements Mergeable {
    apexPage!: string
    enabled!: boolean
    key(){
        return this.apexPage;
    }
    isSorted() { return true; }

}
export class PermissionSetRecordTypeVisibility implements Mergeable {
    recordType!: string
    visible!: boolean
    key(){
        return this.recordType;
    }
    isSorted() { return true; }

}
export class PermissionSetTabSetting implements Mergeable {
    tab!: string
    visibility!: PermissionSetTabVisibility
    key(){
        return this.tab;
    }
    isSorted() { return true; }

}
export class PermissionSetUserPermission implements Mergeable {
    enabled!: boolean
    name!: string
    key(){
        return this.name;
    }
    isSorted() { return true; }

}
export class PermissionSetGroup extends Metadata implements Mergeable {
    description?: string
    isCalculatingChanges?: boolean
    label!: string
    permissionSets?: string[]
    key(){
        return this.label;
    }
    isSorted() { return true; }

}
