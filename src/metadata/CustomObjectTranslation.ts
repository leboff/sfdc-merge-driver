import {
  Mergeable
} from './../../lib/metadata/Mergeable.d';
import {
  Metadata
} from './Metadata'
import {
  Type
} from 'serializer.ts/Decorators'
import {
  Gender,
  StartsWith
} from './CustomObject';

type Article = "None" | "Indefinite" | "Definite";
type CaseType = "Nominative" | "Accusative" | "Genitive" | "Dative" | "Inessive" | "Elative" | "Illative" | "Adessive" | "Ablative" | "Allative" | "Essive" | "Translative" | "Partitive" | "Objective" | "Subjective" | "Instrumental" | "Prepositional" | "Locative" | "Vocative" | "Sublative" | "Superessive" | "Delative" | "Causalfinal" | "Essiveformal" | "Termanative" | "Distributive" | "Ergative" | "Adverbial" | "Abessive" | "Comitative";
type Possessive = "None" | "First" | "Second";

class MergeableCustomObjectTranslation implements Mergeable {
  name!: string;
  key() {
    return this.name
  }
  isSorted() {
    return true;
  }
}
export class CustomObjectTranslation extends Metadata {
  @Type(() => ObjectNameCaseValue)
  caseValues ? : ObjectNameCaseValue[];
  @Type(() => FieldSetTranslation)
  fieldSets ? : FieldSetTranslation[];
  @Type(() => CustomFieldTranslation)
  fields ? : CustomFieldTranslation[];
  gender ? : Gender;
  @Type(() => LayoutTranslation)
  layouts ? : LayoutTranslation[];
  nameFieldLabel ? : string;
  @Type(() => QuickActionTranslation)
  quickActions ? : QuickActionTranslation[];
  @Type(() => RecordTypeTranslation)
  recordTypes ? : RecordTypeTranslation[];
  @Type(() => SharingReasonTranslation)
  sharingReasons ? : SharingReasonTranslation[];
  @Type(() => StandardFieldTranslation)
  standardFields ? : StandardFieldTranslation[];
  startsWith ? : StartsWith;
  @Type(() => ValidationRuleTranslation)
  validationRules ? : ValidationRuleTranslation[];
  @Type(() => WebLinkTranslation)
  webLinks ? : WebLinkTranslation[];
  @Type(() => WorkflowTaskTranslation)
  workflowTasks ? : WorkflowTaskTranslation[];
}

export class ObjectNameCaseValue implements Mergeable {
  article ? : Article;
  caseType ? : CaseType;
  plural ? : boolean;
  possessive ? : Possessive;
  value!: string;
  key() {
    return `${this.caseType}.${this.plural}.${this.possessive}`
  }
  isSorted() {
    return true;
  }
}
export class FieldSetTranslation {
  label!: string;
  name!: string;
}
export class CustomFieldTranslation implements Mergeable {
  @Type(() => ObjectNameCaseValue)
  caseValues ? : ObjectNameCaseValue[];
  gender ? : Gender;
  help ? : string;
  label ? : string;
  @Type(() => LookupFilterTranslation)
  lookupFilter ? : LookupFilterTranslation;
  name!: string;
  @Type(() => PicklistValueTranslation)
  picklistValues ? : PicklistValueTranslation[];
  relationshipLabel ? : string;
  startsWith ? : StartsWith;
  key() {
    return `${this.name}.${this.gender}`
  }
  isSorted() {
    return true;
  }
}
export class LookupFilterTranslation extends MergeableCustomObjectTranslation {
  errorMessage!: string;
  informationalMessage!: string;
}
export class PicklistValueTranslation implements Mergeable {
  masterLabel!: string;
  translation ? : string;
  key() {
    return this.masterLabel
  }
  isSorted() {
    return true;
  }
}
export class LayoutTranslation implements Mergeable {
  layout!: string;
  layoutType ? : string;
  @Type(() => LayoutSectionTranslation)
  sections ? : LayoutSectionTranslation[];
  key() {
    return this.layout
  }
  isSorted() {
    return true;
  }
}
export class LayoutSectionTranslation extends MergeableCustomObjectTranslation {
  label!: string;
  section!: string;
}
export class QuickActionTranslation extends MergeableCustomObjectTranslation {
  label!: string;
  name!: string;
}
export class RecordTypeTranslation extends MergeableCustomObjectTranslation {
  description ? : string;
  label!: string;
  name!: string;
}
export class SharingReasonTranslation extends MergeableCustomObjectTranslation {
  label!: string;
  name!: string;
}
export class StandardFieldTranslation extends MergeableCustomObjectTranslation {
  label ? : string;
  name!: string;
}
export class ValidationRuleTranslation extends MergeableCustomObjectTranslation {
  errorMessage!: string;
  name!: string;
}
export class WebLinkTranslation extends MergeableCustomObjectTranslation {
  label!: string;
  name!: string;
}
export class WorkflowTaskTranslation extends MergeableCustomObjectTranslation {
  description ? : string;
  name!: string;
  subject ? : string;
}
