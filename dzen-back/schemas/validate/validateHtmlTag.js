const { aTagPattern, tagPattern, urlPattern } = require("./validatePattern");

const validateHtmlTags = (text) => {
  const tagStack = [];
  let match;

  while ((match = tagPattern.exec(text))) {
    const tag = match[1];
    const attributes = match[2] ? match[2].trim() : "";
    const isClosingTag = match[0][1] === "/";

    if (!tag) {
      return `Tag ${match[0]} not allowed.`;
    }

    if (tag === "a" && !isClosingTag) {
      const aTagMatch = aTagPattern.exec(attributes);
      if (!aTagMatch) {
        return `The <a> tag must contain the href and title attributes in that order.`;
      }
      const url = aTagMatch[1];
      const title = aTagMatch[2];
      if (!urlPattern.test(url)) {
        return `The href attribute in the <a> tag must contain a valid URL.`;
      }
      if (!title) {
        return `The title attribute in the <a> tag must not be empty.`;
      }
    } else if (attributes) {
      return `Tag <${
        isClosingTag ? "/" : ""
      }${tag}> must not contain attributes`;
    }

    if (isClosingTag) {
      if (!tagStack.length || tagStack[tagStack.length - 1] !== tag) {
        return `The </${tag}> tag does not match the last opened tag.`;
      }
      tagStack.pop();
    } else {
      tagStack.push(tag);
    }
  }

  if (tagStack.length) {
    return `Tag <${tagStack[tagStack.length - 1]}> not closed`;
  }

  return true;
};

module.exports = { validateHtmlTags };
