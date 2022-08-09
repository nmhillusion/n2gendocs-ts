export interface CommentDocsModel {
  content: string;
  paramsComment: {
    [paramName: string]: string;
  };
  returnsComment: string;
}
