import { TsExportModel } from "@nmhillusion/n2mix/dist/javascript/modules/parser/typescript";
import { obtainTemplateMod } from "../modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "../modules/resolveVariableTemplate.mod";
import { TemplateType } from "../modules/Template.type";
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
      varValue: commentGenerateDocs(exportNode.comments).content,
    },
  ]);

  return renderedContent;
}
