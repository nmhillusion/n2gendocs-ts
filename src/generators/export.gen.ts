import { TsExportModel } from "@nmhillusion/n2mix/parser/typescript";
import { existsSync, lstatSync } from "fs";
import path from "path";
import { obtainTemplateMod } from "../modules/obtainTemplate.mod";
import { resolveVariablesTemplate } from "../modules/resolveVariableTemplate.mod";
import { TemplateType } from "../modules/Template.type";
import { commentGenerateDocs } from "./comment.gen";

export function exportGenerateDocs(exportNode: TsExportModel): string {
  console.log({ exportNode });

  const templateContent = obtainTemplateMod(TemplateType.EXPORT_TEMPLATE);

  const renderedContent = resolveVariablesTemplate(templateContent, [
    {
      varName: "exportName",
      varValue: exportNode.exportName,
    },
    {
      varName: "moduleSpecifier",
      varValue: buildModuleSpecifier(exportNode),
    },
    {
      varName: "commentsOfExport",
      varValue: `    ${commentGenerateDocs(exportNode.comments).content}`,
    },
  ]);

  return renderedContent;
}

function buildModuleSpecifier(exportNode: TsExportModel) {
  const unescapeModuleSpecifier = exportNode.moduleSpecifier?.replace(
    /'|"/g,
    ""
  );

  if (!unescapeModuleSpecifier) {
    return unescapeModuleSpecifier;
  }

  const expectFolderPath = path.join(
    path.dirname(exportNode.filePath),
    unescapeModuleSpecifier
  );
  const expectTsFilePath = path.join(
    path.dirname(exportNode.filePath),
    exportNode.moduleSpecifier.endsWith(".ts")
      ? exportNode.moduleSpecifier
      : unescapeModuleSpecifier + ".ts"
  );

  console.log({ expectFolderPath, expectMdFilePath: expectTsFilePath });

  if (
    existsSync(expectFolderPath) &&
    lstatSync(expectFolderPath).isDirectory()
  ) {
    return `[${unescapeModuleSpecifier}](${unescapeModuleSpecifier})`;
  } else if (
    existsSync(expectTsFilePath) &&
    lstatSync(expectTsFilePath).isFile()
  ) {
    return `[${unescapeModuleSpecifier}.md](${unescapeModuleSpecifier}.md)`;
  } else {
    return `\`${unescapeModuleSpecifier}\``;
  }
}
