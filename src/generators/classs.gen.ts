import { TsClassModel } from "@nmhillusion/n2mix/dist/javascript/modules/parser/typescript";
import { obtainTemplateMod } from "@root/modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "@root/modules/resolveVariableTemplate.mod";
import { TemplateType } from "@root/modules/Template.type";
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
      varValue: commentGenerateDocs(classNode.comments).content,
    },
    {
      varName: "propertyListContent",
      varValue:
        0 < classNode.propertyList.length
          ? classNode.propertyList
              .map(parameterPropertyGenerateDocs)
              .join("\n\n--\n\n")
          : "`None`",
    },
    {
      varName: "methodListContent",
      varValue: classNode.methodList
        .map((method) => functionGenerateDocs(method, true))
        .join("\n\n--\n\n"),
    },
  ]);

  return renderedContent;
}
