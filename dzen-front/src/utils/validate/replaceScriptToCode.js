import { scriptOpenTagPattern, scriptCloseTagPattern } from "./validatePattern";

export const replaceScriptToCodeTags = (html) => {
  return html
    .replace(scriptOpenTagPattern, "<code>")
    .replace(scriptCloseTagPattern, "</code>");
};
