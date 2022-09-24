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
      varValue: buildExportName(exportNode),
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
  const expectJsFilePath = path.join(
    path.dirname(exportNode.filePath),
    exportNode.moduleSpecifier.endsWith(".js")
      ? exportNode.moduleSpecifier
      : unescapeModuleSpecifier + ".js"
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
  } else if (
    existsSync(expectJsFilePath) &&
    lstatSync(expectJsFilePath).isFile()
  ) {
    return `[${unescapeModuleSpecifier}.md](${unescapeModuleSpecifier}.md)`;
  } else {
    return `\`${unescapeModuleSpecifier}\``;
  }
}

function buildExportName(exportNode: TsExportModel): string {
  if (exportNode.exportName) {
    return `\`${exportNode.exportName}\``;
  }

  const unescapeModuleSpecifier = exportNode.moduleSpecifier?.replace(
    /'|"/g,
    ""
  );

  if (!unescapeModuleSpecifier) {
    return `\`${unescapeModuleSpecifier}\``;
  }

  return `all exports from - \`${path.basename(unescapeModuleSpecifier)}\``;
}
