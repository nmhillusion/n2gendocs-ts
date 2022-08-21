import {
  TsFunctionModel,
  TsParamModel,
} from "@nmhillusion/n2mix/dist/javascript/modules/parser/typescript";
import { resolveVariablesTemplate } from "@root/modules/resolveVariableTemplate.mod";
import { obtainTemplateMod } from "@root/modules/obtainTemplate.mod";
import { TemplateType } from "@root/modules/Template.type";
import { parameterPropertyGenerateDocs } from "./parameter.gen";
import { commentGenerateDocs } from "./comment.gen";

export function functionGenerateDocs(
  funcNode: TsFunctionModel,
  isMethodOfClass: boolean = false
) {
  const templateContent = !isMethodOfClass
    ? obtainTemplateMod(TemplateType.FUNCTION_TEMPLATE)
    : obtainTemplateMod(TemplateType.CLASS_METHOD_TEMPLATE);

  // console.log({ templateContent });

  const {
    content: commentContent,
    paramsComment,
    returnsComment,
  } = commentGenerateDocs(funcNode.comments);

  injectCommentForParamList(funcNode, paramsComment);

  const renderedContent = resolveVariablesTemplate(templateContent, [
    {
      varName: "functionName",
      varValue:
        funcNode.functionName + generateParameterList(funcNode.paramList),
    },
    {
      varName: "commentsOfFunction",
      varValue: `    ${commentContent}`,
    },
    {
      varName: "parameterListContent",
      varValue: funcNode.paramList
        .map((param) => parameterPropertyGenerateDocs(param))
        .join("\n"),
    },
    { varName: "returnType", varValue: funcNode.returnType || `Not defined` },
    {
      varName: "returnComment",
      varValue: returnsComment ? `--- ${returnsComment}` : "",
    },
  ]);

  return renderedContent;
}

function injectCommentForParamList(
  funcNode: TsFunctionModel,
  paramsComment: { [paramName: string]: string }
) {
  for (const param of funcNode.paramList) {
    const paramComment = paramsComment[param.name];
    console.log({ paramComment, paramsComment });

    if (paramComment) {
      param.comments.push({
        content: paramComment,
      });
    }
  }
}

function generateParameterList(paramList: TsParamModel[]) {
  const paramDocsList = [];

  for (const param of paramList) {
    const paramDocs = `${param.name}${param.optional ? "?" : ""}: ${
      param.type ? param.type : "any"
    }`;

    paramDocsList.push(paramDocs);
  }

  return `(${paramDocsList.join(", ")})`;
}
