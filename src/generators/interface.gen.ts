import { TsInterfaceModel } from "@nmhillusion/n2mix/dist/javascript/modules/parser/typescript";
import { obtainTemplateMod } from "../modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "../modules/resolveVariableTemplate.mod";
import { TemplateType } from "../modules/Template.type";
import { commentGenerateDocs } from "./comment.gen";
import { functionGenerateDocs } from "./function.gen";
import { parameterPropertyGenerateDocs } from "./parameter.gen";

export function interfaceGenerateDocs(interfNode: TsInterfaceModel) {
  const templateContent = obtainTemplateMod(TemplateType.INTERFACE_TEMPLATE);

  let renderedContent = resolveVariablesTemplate(templateContent, [
    {
      varName: "interfaceName",
      varValue: interfNode.interfaceName,
    },
    {
      varName: "commentsOfInterface",
      varValue: commentGenerateDocs(interfNode.comments).content,
    },
    {
      varName: "propertyListContent",
      varValue:
        0 < interfNode.propertyList.length
          ? interfNode.propertyList
              .map(parameterPropertyGenerateDocs)
              .join("\n\n")
          : "`None`",
    },
    {
      varName: "methodListContent",
      varValue:
        0 < interfNode.methodList.length
          ? interfNode.methodList
              .map((method) => functionGenerateDocs(method, true))
              .join("\n---\n")
          : "`None`",
    },
  ]);

  return renderedContent;
}
