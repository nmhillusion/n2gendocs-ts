import {
  TsParamModel,
  TsPropertyModel,
} from "@nmhillusion/n2mix/parser/typescript";
import { resolveVariablesTemplate } from "@nmhillusion/n2gendocs-ts/modules/resolveVariableTemplate.mod";
import { obtainTemplateMod } from "@nmhillusion/n2gendocs-ts/modules/obtainTemplate.mod";
import { TemplateType } from "@nmhillusion/n2gendocs-ts/modules/Template.type";
import { commentGenerateDocs } from "./comment.gen";

export function parameterPropertyGenerateDocs(
  propNode: TsParamModel | TsPropertyModel
) {
  const templateContent = obtainTemplateMod(TemplateType.PROPERTY_TEMPLATE);

  const propertyName: string = propNode.name;
  const propertyType: string = propNode.type;
  const commentsOfProperty: string = `-- ${
    commentGenerateDocs(propNode.comments).content
  }`;
  const optional: string = propNode.optional ? "_(optional)_ " : "";

  const renderedContent = resolveVariablesTemplate(templateContent, [
    { varName: "propertyName", varValue: propertyName },
    {
      varName: "commentsOfProperty",
      varValue: commentsOfProperty,
    },
    {
      varName: "propertyType",
      varValue: propertyType,
    },
    { varName: "optional", varValue: optional },
  ]);

  return renderedContent;
}
