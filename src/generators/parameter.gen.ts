import {
  TsParamModel,
  TsPropertyModel,
} from "@nmhillusion/n2mix/parser/typescript";
import { resolveVariablesTemplate } from "../modules/resolveVariableTemplate.mod";
import { obtainTemplateMod } from "../modules/obtainTemplate.mod";
import { TemplateType } from "../modules/Template.type";
import { commentGenerateDocs } from "./comment.gen";

export function parameterPropertyGenerateDocs(
  propNode: TsParamModel | TsPropertyModel
) {
  const templateContent = obtainTemplateMod(TemplateType.PROPERTY_TEMPLATE);

  const propComment = commentGenerateDocs(propNode.comments).content;

  const propertyName: string = propNode.name;
  const propertyType: string = propNode.type;
  const commentsOfProperty: string = String(propComment).trim()
    ? `-- ${propComment}`
    : "";
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
