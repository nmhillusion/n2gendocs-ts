import { TsInterfaceModel } from "@nmhillusion/n2mix/parser/typescript";
import { Constant } from "@nmhillusion/n2gendocs-ts/modules/Contant.enum";
import { obtainTemplateMod } from "@nmhillusion/n2gendocs-ts/modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "@nmhillusion/n2gendocs-ts/modules/resolveVariableTemplate.mod";
import { TemplateType } from "@nmhillusion/n2gendocs-ts/modules/Template.type";
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
