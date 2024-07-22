export const insertTag = (tagName, value, start, end) => {
  const tag = { open: "", close: "" };
  switch (tagName) {
    case "a":
      tag.open = '<a href="" title="">';
      tag.close = "</a>";
      break;
    case "i":
      tag.open = "<i>";
      tag.close = "</i>";
      break;
    case "s":
      tag.open = "<strong>";
      tag.close = "</strong>";
      break;
    case "c":
      tag.open = "<code>";
      tag.close = "</code>";
  }

  const [first, last] = start > end ? [end, start] : [start, end];
  const len = last - first;
  let outputValue = `${value.slice(0, last)}${tag.close}${value.slice(last)}`;
  outputValue = `${outputValue.slice(0, first)}${tag.open}${outputValue.slice(
    first
  )}`;
  const [selectionStart, selectionEnd] =
    start > end
      ? [end + tag.open.length + len, end + tag.open.length]
      : [start + tag.open.length, start + tag.open.length + len];
  return { value: outputValue, selectionStart, selectionEnd };
};
