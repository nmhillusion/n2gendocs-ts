import { TsCommentModel } from "@nmhillusion/n2mix/parser/typescript";
import { CommentDocsModel } from "@nmhillusion/n2gendocs-ts/models/comment.docs.model";

export function commentGenerateDocs(
  comments: TsCommentModel[]
): CommentDocsModel {
  let renderedComments: string[] = [];
  const paramsComment = {};
  let returnsComment = "";

  if (comments) {
    renderedComments = comments
      .map((cmt) => String(cmt.content).trim())
      .map((line) => {
        const { returnedComment, paramComment, paramName } =
          formatForParamLine(line);

        if (paramName) {
          paramsComment[paramName] = paramComment;
        }
        return returnedComment;
      })
      .map((line) => {
        const { returnedComment, returnsCommentContent } =
          formatForReturnLine(line);

        if (returnsCommentContent) {
          returnsComment = returnsCommentContent;
        }

        return returnedComment;
      })
      .filter(Boolean);
  }

  return {
    content: renderedComments.join("\n\n"),
    paramsComment,
    returnsComment,
  };
}

function formatForParamLine(comment: string): {
  returnedComment: string;
  paramName?: string;
  paramComment?: string;
} {
  if (!comment.startsWith("@param")) {
    return {
      returnedComment: comment,
    };
  }

  const words = comment
    .split(/\s/)
    .map((w) => w.trim())
    .filter(Boolean);

  let paramName = "";
  let paramComment = "";
  if (2 <= words.length) {
    paramName = words[1];
    paramComment = words.slice(2).join(" ");
  } else {
    return {
      returnedComment: comment,
    };
  }

  return {
    returnedComment: "",
    paramComment,
    paramName,
  };
}

function formatForReturnLine(comment: string): {
  returnedComment: string;
  returnsCommentContent?: string;
} {
  if (!comment.startsWith("@return")) {
    return {
      returnedComment: comment,
    };
  }

  const words = comment
    .split(/\s/)
    .map((w) => w.trim())
    .filter(Boolean);

  let returnsCommentContent = "";
  if (1 <= words.length) {
    returnsCommentContent = words.slice(1).join(" ");
  } else {
    return {
      returnedComment: comment,
    };
  }

  return {
    returnedComment: "",
    returnsCommentContent,
  };
}
