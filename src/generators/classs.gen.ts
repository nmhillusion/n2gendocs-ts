import { TsClassModel } from "@nmhillusion/n2mix/parser/typescript/model";
import { Constant } from "@nmhillusion/n2gendocs-ts/modules/Contant.enum";
import { obtainTemplateMod } from "@nmhillusion/n2gendocs-ts/modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "@nmhillusion/n2gendocs-ts/modules/resolveVariableTemplate.mod";
import { TemplateType } from "@nmhillusion/n2gendocs-ts/modules/Template.type";
import { commentGenerateDocs } from "./comment.gen";
import { functionGenerateDocs } from "./function.gen";
import { parameterPropertyGenerateDocs } from "./parameter.gen";

export function classGenerateDocs(classNode: TsClassModel): string {
  const templateContent = obtainTemplateMod(TemplateType.CLASS_TEMPLATE);

  const renderedContent = resolveVariablesTemplate(templateContent, [
    {
      varName: "className",
      varValue: classNode.className,
    },
    {
      varName: "commentsOfClass",
      varValue: `    ${commentGenerateDocs(classNode.comments).content}`,
    },
    {
      varName: "propertyListContent",
      varValue:
        0 < classNode.propertyList.length
          ? classNode.propertyList
              .map(parameterPropertyGenerateDocs)
              .join(Constant.SEPERATE_MEMBER)
          : "`None`",
    },
    {
      varName: "methodListContent",
      varValue: classNode.methodList
        .map((method) => functionGenerateDocs(method, true))
        .join(Constant.SEPERATE_MEMBER),
    },
  ]);

  return renderedContent;
}
