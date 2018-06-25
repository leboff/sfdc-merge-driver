import {
  Metadata
} from './Metadata';
import {
  Type
} from 'serializer.ts/Decorators'
import {
  Mergeable
} from './Mergeable';

class MergeableTranslation implements Mergeable {
  name!: string;
  fullName ? : string;
  key() {
    return this.fullName || this.name;
  }
  isSorted() {
    return true;
  }

}
export class Translations extends Metadata {
  @Type(() => CustomApplicationTranslation)
  customApplications ? : CustomApplicationTranslation[];
  @Type(() => CustomDataTypeTranslation)
  customDataTypeTranslations ? : CustomDataTypeTranslation[];
  @Type(() => CustomLabelTranslation)
  customLabels ? : CustomLabelTranslation[];
  @Type(() => CustomPageWebLinkTranslation)
  customPageWebLinks ? : CustomPageWebLinkTranslation[];
  @Type(() => CustomTabTranslation)
  customTabs ? : CustomTabTranslation[];
  @Type(() => FlowDefinitionTranslation)
  flowDefinitions ? : FlowDefinitionTranslation[];
  @Type(() => GlobalQuickActionTranslation)
  quickActions ? : GlobalQuickActionTranslation[];
  @Type(() => ReportTypeTranslation)
  reportTypes ? : ReportTypeTranslation[];
  @Type(() => ScontrolTranslation)
  scontrols ? : ScontrolTranslation[];
}
export class CustomApplicationTranslation extends MergeableTranslation {
  label!: string;
  name!: string;
}
export class CustomDataTypeTranslation {
  @Type(() => CustomDataTypeComponentTranslation)
  components ? : CustomDataTypeComponentTranslation[];
  customDataTypeName!: string;
  description ? : string;
  label ? : string;
}
export class CustomDataTypeComponentTranslation {
  developerSuffix!: string;
  label ? : string;
}
export class CustomLabelTranslation extends MergeableTranslation {
  label!: string;
  name!: string;
}
export class CustomPageWebLinkTranslation extends MergeableTranslation {
  label!: string;
  name!: string;
}
export class CustomTabTranslation extends MergeableTranslation {
  label!: string;
  name!: string;
}
export class FlowDefinitionTranslation extends MergeableTranslation {
  @Type(() => FlowTranslation)
  flows ? : FlowTranslation[];
  fullName!: string;
  label ? : string;
}
export class FlowTranslation extends MergeableTranslation {
  @Type(() => FlowChoiceTranslation)
  choices ? : FlowChoiceTranslation[];
  fullName!: string;
  label ? : string;
  @Type(() => FlowScreenTranslation)
  screens ? : FlowScreenTranslation[];
  @Type(() => FlowStageTranslation)
  stages ? : FlowStageTranslation[];
}
export class FlowChoiceTranslation extends MergeableTranslation {
  choiceText ? : string;
  name!: string;
  @Type(() => FlowChoiceUserInputTranslation)
  userInput ? : FlowChoiceUserInputTranslation;
}
export class FlowChoiceUserInputTranslation {
  promptText ? : string;
  @Type(() => FlowInputValidationRuleTranslation)
  validationRule ? : FlowInputValidationRuleTranslation;
}
export class FlowInputValidationRuleTranslation {
  errorMessage ? : string;
}
export class FlowScreenTranslation extends MergeableTranslation {
  @Type(() => FlowScreenFieldTranslation)
  fields ? : FlowScreenFieldTranslation[];
  helpText ? : string;
  name!: string;
  pausedText ? : string;
}
export class FlowScreenFieldTranslation extends MergeableTranslation {
  fieldText ? : string;
  helpText ? : string;
  name!: string;
  @Type(() => FlowInputValidationRuleTranslation)
  validationRule ? : FlowInputValidationRuleTranslation;
}
export class FlowStageTranslation extends MergeableTranslation {
  label ? : string;
  name!: string;
}
export class GlobalQuickActionTranslation extends MergeableTranslation {
  label!: string;
  name!: string;
}
export class ReportTypeTranslation extends MergeableTranslation {
  description ? : string;
  label ? : string;
  name!: string;
  @Type(() => ReportTypeSectionTranslation)
  sections ? : ReportTypeSectionTranslation[];
}
export class ReportTypeSectionTranslation extends MergeableTranslation {
  @Type(() => ReportTypeColumnTranslation)
  columns ? : ReportTypeColumnTranslation[];
  label ? : string;
  name!: string;
}
export class ReportTypeColumnTranslation extends MergeableTranslation {
  label!: string;
  name!: string;
}
export class ScontrolTranslation extends MergeableTranslation {
  label!: string;
  name!: string;
}
