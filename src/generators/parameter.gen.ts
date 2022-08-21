import {
  TsParamModel,
  TsPropertyModel,
} from "@nmhillusion/n2mix/dist/javascript/modules/parser/typescript";
import { resolveVariablesTemplate } from "@root/modules/resolveVariableTemplate.mod";
import { obtainTemplateMod } from "@root/modules/obtainTemplate.mod";
import { TemplateType } from "@root/modules/Template.type";
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
  const optional: string = propNode.optional ? "(optional)" : "";

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
