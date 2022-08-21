import { TsExportModel } from "@nmhillusion/n2mix/parser/typescript";
import { obtainTemplateMod } from "@root/modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "@root/modules/resolveVariableTemplate.mod";
import { TemplateType } from "@root/modules/Template.type";
import { commentGenerateDocs } from "./comment.gen";

export function exportGenerateDocs(exportNode: TsExportModel): string {
  const templateContent = obtainTemplateMod(TemplateType.EXPORT_TEMPLATE);

  const renderedContent = resolveVariablesTemplate(templateContent, [
    {
      varName: "exportName",
      varValue: exportNode.exportName,
    },
    {
      varName: "moduleSpecifier",
      varValue: exportNode.moduleSpecifier,
    },
    {
      varName: "commentsOfExport",
      varValue: `    ${commentGenerateDocs(exportNode.comments).content}`,
    },
  ]);

  return renderedContent;
}
