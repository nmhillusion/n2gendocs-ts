import { TsFileModel, TsParser } from "@nmhillusion/n2mix/parser/typescript";
import { Constant } from "../modules/Constant.enum";
import { PathLike } from "fs";
import { classGenerateDocs } from "./classs.gen";
import { exportGenerateDocs } from "./export.gen";
import { functionGenerateDocs } from "./function.gen";
import { interfaceGenerateDocs } from "./interface.gen";

export class DocsGenerator {
  constructor(
    private tsFilePath: PathLike,
    private onlyGenForExport: boolean = true
  ) {}

  generate() {
    const docsPart: string[] = [];
    const tsFileModel: TsFileModel = new TsParser(this.tsFilePath).parse();

    for (const interf of tsFileModel.tsInterfaceList) {
      if (!this.onlyGenForExport || interf.isExport) {
        const interfDocs = interfaceGenerateDocs(interf);
        docsPart.push(interfDocs);
      }
    }

    for (const exp of tsFileModel.tsExportList) {
      const exportDocs = exportGenerateDocs(exp);
      docsPart.push(exportDocs);
    }

    for (const cls of tsFileModel.tsClassList) {
      if (!this.onlyGenForExport || cls.isExport) {
        const classDocs = classGenerateDocs(cls);
        docsPart.push(classDocs);
      }
    }

    for (const func of tsFileModel.tsFunctionList) {
      if (!this.onlyGenForExport || func.isExport) {
        const funcDocs = functionGenerateDocs(func, false);
        docsPart.push(funcDocs);
      }
    }

    return docsPart.join(
      Constant.SEPERATE_MEMBER + "\n\n---\n\n" + Constant.SEPERATE_MEMBER
    );
  }
}
