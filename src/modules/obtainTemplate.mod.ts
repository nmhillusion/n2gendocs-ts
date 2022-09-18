import { CommonUtil } from "@nmhillusion/n2mix/file/common.util";
import * as fs from "fs";
import path from "path";
import { TemplateType } from "./Template.type";

const TEMPLATE_CACHE: { [P in TemplateType]?: string } = {};

export function obtainTemplateMod(templateType: TemplateType): string {
  if (TEMPLATE_CACHE[templateType]) {
    return TEMPLATE_CACHE[templateType];
  }

  const templateFilePath = path.join(__dirname, templateType);

  if (CommonUtil.isFile(templateFilePath)) {
    const templateContent = fs.readFileSync(templateFilePath).toString();

    TEMPLATE_CACHE[templateType] = templateContent;

    return templateContent;
  } else {
    throw new Error(
      "Cannot find template resource. Please notify to developer of this package. Path: " +
        templateFilePath
    );
  }
}
