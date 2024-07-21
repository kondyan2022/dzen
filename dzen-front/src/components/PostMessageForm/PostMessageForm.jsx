import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import {
  captchaPattern,
  emailPattern,
  urlPattern,
  usernamePattern,
  validateHtmlTags,
} from "../../utils/validate";
import { useCaptcha } from "../../hooks";
import { sendPost } from "../../api";
import { useResizedImage } from "../../hooks/useResizedImage";
import { PostMessageFormWrapper } from "./PostMessageForm.styled";
import {
  BoldOutlined,
  CloseCircleOutlined,
  CodeOutlined,
  ItalicOutlined,
  LinkOutlined,
  RedoOutlined,
} from "@ant-design/icons";
// import { resizedImageIfNeed } from "../../utils";

export const PostMessageForm = ({ level = 0, parentId, handleClose }) => {
  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [parsedText, setParsedText] = useState(null);
  const [resizedImage, setResizedImage, ratio] = useResizedImage();
  const { loading, data: captchaData, error, reload } = useCaptcha();
  const refTextarea = useRef();
  const { ref, ...rest } = register("text", {
    required: "Required field",
    validate: validateHtmlTags,
  });

  const onSubmit = async (data) => {
    setParsedText(parse(data.text));
    console.log(data);
    if (parentId) {
      data["parentId"] = parentId;
    }
    const response = await toast.promise(
      sendPost(data, captchaData, resizedImage, ratio),
      {
        pending: "Sending message",
        success: "Message sent 👌",
        error: {
          render: ({ data }) => {
            console.log(data);

            return `${data.response?.data?.message}. Try again!`;
          },
        },
      }
    );
    reload();
    setValue("captcha", "");
  };

  const onChange = async (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const { type, size } = file;
      if (type === "text/plain") {
        setResizedImage(null);
        if (size > 100 * 1024) {
          toast.error("maximum text file size is 100Kb");
          setValue("file", "");
        }
      } else {
        setResizedImage(file);
      }
    }
  };

  return (
    <PostMessageFormWrapper level={level}>
      <div className="form-title">
        <span>New message</span>
        <button type="button" onClick={handleClose}>
          <CloseCircleOutlined style={{ fontSize: "24px" }} />
        </button>
      </div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="column-one">
          <label>
            User name
            <input
              type="text"
              {...register("username", {
                required: "Please enter your name",
                minLength: { value: 2, message: "min length is 2" },
                pattern: {
                  value: usernamePattern,
                  message: "Only latin letters or digits",
                },
              })}
              placeholder="User name"
            />
          </label>
          <p>{errors.username?.message}</p>
          <label>
            Email
            <input
              type="email"
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value: emailPattern,
                  message: "Invalid email address",
                },
              })}
              placeholder="E-mail"
              autoComplete="off"
            />
          </label>
          <p>{errors.email?.message}</p>
          <label>
            Home page
            <input
              type="text"
              {...register("homepage", {
                pattern: {
                  value: urlPattern,
                  message: "Invalid url",
                },
              })}
              placeholder="Homepage URL"
              autoComplete="off"
            />
          </label>
          <p>{errors.homepage?.message}</p>
        </div>
        <div className="column-two">
          <label>
            Message
            <BoldOutlined
              onClick={(e) => {
                const {
                  selectionEnd,
                  selectionStart,
                  selectionDirection,
                  value,
                } = refTextarea.current;
                const [first, last] =
                  selectionDirection === "forward"
                    ? [selectionStart, selectionEnd]
                    : [selectionEnd, selectionStart];
                const length = last - first;

                const output1 = [
                  value.slice(0, last),
                  "</strong>",
                  value.slice(last),
                ].join("");
                const output2 = [
                  output1.slice(0, first),
                  "<strong>",
                  output1.slice(first),
                ].join("");
                // console.log(output2);

                setValue("text", output2);
                refTextarea.current.setSelectionRange(
                  first + 8,
                  first + 8 + length
                );
              }}
            />
            <ItalicOutlined />
            <CodeOutlined />
            <LinkOutlined />
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
          <p>{errors.text?.message}</p>
          <div className="captcha-send-wrapper">
            <div className="captcha-error-wrapper">
              <div className="captcha">
                <label>
                  <input
                    type="text"
                    {...register("captcha", {
                      required: "captcha required",
                      pattern: {
                        value: captchaPattern,
                        message: "Only latin letters or digits",
                      },
                    })}
                    // id="captcha"
                    placeholder="captcha"
                    autoComplete="off"
                  />
                </label>

                {captchaData?.image && (
                  <img
                    src={captchaData.image}
                    alt="captcha"
                    className="captcha-image"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    reload();
                  }}
                >
                  <RedoOutlined rotate={-90} />
                </button>
              </div>
              <p>{errors.captcha?.message}</p>
            </div>

            <button type="submit">Send</button>
          </div>
          <label>
            Add file
            <input
              className="hidden-element"
              {...register("file")}
              type="file"
              accept=".png,.jpeg,.jpg,.gif,.txt"
              onChange={onChange}
              id="file"
            />
          </label>
          {resizedImage && <img src={resizedImage} alt="uploaded image" />}
          <div>{parsedText}</div>
        </div>
      </form>
    </PostMessageFormWrapper>
  );
};
