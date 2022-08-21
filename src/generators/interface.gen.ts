import { TsInterfaceModel } from "@nmhillusion/n2mix/parser/typescript";
import { Constant } from "@root/modules/Contant.enum";
import { obtainTemplateMod } from "@root/modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "@root/modules/resolveVariableTemplate.mod";
import { TemplateType } from "@root/modules/Template.type";
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
      varValue: `    ${commentGenerateDocs(interfNode.comments).content}`,
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
              .join(Constant.SEPERATE_MEMBER)
          : "`None`",
    },
  ]);

  return renderedContent;
}
