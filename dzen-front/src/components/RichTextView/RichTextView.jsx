import parse from "html-react-parser";

export const RichTextView = ({ text }) => {
  return <>{parse(text)}</>;
};
