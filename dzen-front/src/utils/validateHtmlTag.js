export const validateHtmlTags = (text) => {
  const tagPattern = /<\/?(a|code|i|strong)(\s+[^>]*?)?>|<\/?[^>]+>/g;
  const aTagPattern = /^href\s*=\s*"([^"]*)"\s+title\s*=\s*"([^"]+)"\s*$/;
  const urlPattern = /^(http(s)?):\/\/[^\s/$.?#].[^\s]*$/i;
  const tagStack = [];
  let match;

  while ((match = tagPattern.exec(text))) {
    console.log(match);
    const tag = match[1];
    const attributes = match[2] ? match[2].trim() : "";
    const isClosingTag = match[0][1] === "/";

    if (!tag) {
      return `Tag ${match[0]} not allowed.`;
    }

    if (tag === "a" && !isClosingTag) {
      console.log(attributes);
      const aTagMatch = aTagPattern.exec(attributes);
      console.log(aTagMatch);
      if (!aTagMatch) {
        return `Тег <a> должен содержать атрибуты href и title в указаном порядке.`;
      }
      const url = aTagMatch[1];
      const title = aTagMatch[2];
      if (!urlPattern.test(url)) {
        return `Атрибут href в теге <a> должен содержать корректный URL.`;
      }
      if (!title) {
        return `Атрибут title в теге <a> не должен быть пустым.`;
      }
    } else if (attributes) {
      return `Tag </${tag} не должен содержать атрибутов>`;
    }

    if (isClosingTag) {
      if (!tagStack.length || tagStack[tagStack.length - 1] !== tag) {
        return `Тег </${tag}> не соответствует последнему открытому тегу.`;
      }
      tagStack.pop();
    } else {
      tagStack.push(tag);
    }
  }

  if (tagStack.length) {
    return `Тег <${tagStack[tagStack.length - 1]}> not closed`;
  }

  return true;
};
