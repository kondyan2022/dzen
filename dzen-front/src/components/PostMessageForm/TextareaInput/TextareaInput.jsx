import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import parse from "html-react-parser";
import {
  replaceScriptToCodeTags,
  validateHtmlTags,
} from "../../../utils/validate";
import {
  BoldOutlined,
  CodeOutlined,
  EyeOutlined,
  ItalicOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { insertTag } from "../../../utils/tagText";
import { EditorButton, EditorButtonPanel } from "./TextareaInput.styled";
import Backdrop from "../../Backdrop/Backdrop";
import { TextViewer } from "./TextViewer";

const textEditButtons = [
  { image: <BoldOutlined />, title: "Strong", tag: "s" },
  { image: <ItalicOutlined />, title: "Italic", tag: "i" },
  { image: <CodeOutlined />, title: "Code", tag: "c" },
  { image: <LinkOutlined />, title: "Link", tag: "a" },
];

export const TextareaInput = () => {
  const [textPreview, setTextPreview] = useState(false);
  const refTextarea = useRef();
  const methods = useFormContext();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = methods;
  const { ref, ...rest } = register("text", {
    required: "Required field",
    validate: validateHtmlTags,
  });

  const getHandleClick = (tag) => {
    const fn = () => {
      const { selectionEnd, selectionStart, value } = refTextarea.current;
      const {
        value: newValue,
        selectionStart: start,
        selectionEnd: end,
      } = insertTag(tag, value, selectionStart, selectionEnd);
      setValue("text", newValue);
      refTextarea.current.setSelectionRange(start, end);
    };

    return fn;
  };

  return (
    <>
      <label>
        <span>Message</span>
        <EditorButtonPanel>
          {textEditButtons.map(({ image, title, tag }) => (
            <EditorButton key={tag} title={title} onClick={getHandleClick(tag)}>
              {image}
            </EditorButton>
          ))}
          <EditorButton
            onClick={() => {
              setTextPreview(true);
            }}
          >
            <EyeOutlined title="Preview" />
          </EditorButton>
        </EditorButtonPanel>
        <textarea
          {...rest}
          placeholder="message text"
          autoComplete="off"
          cols={40}
          rows={6}
          ref={(e) => {
            ref(e);
            refTextarea.current = e;
          }}
        />
      </label>
      <p>{errors?.text?.message}</p>
      {textPreview && (
        <Backdrop
          closeModal={() => {
            setTextPreview(false);
          }}
        >
          <TextViewer>
            {parse(replaceScriptToCodeTags(getValues("text")))}
          </TextViewer>
        </Backdrop>
      )}
    </>
  );
};
