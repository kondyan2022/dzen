import { useState } from "react";
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
// import { resizedImageIfNeed } from "../../utils";

export function PostMessageForm() {
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

  const onSubmit = async (data) => {
    setParsedText(parse(data.text));
    console.log(data);
    const response = await toast.promise(
      sendPost(data, captchaData, resizedImage, ratio),
      {
        pending: "Sending message",
        success: "Message sent 👌",
        error: {
          render: ({ data }) => {
            return `${data.response.data?.message}`;
          },
        },
      }
    );
    console.log(response);
  };

  const onChange = async (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const { type, size } = file;
      if (type === "text/plain") {
        setResizedImage(null);
        if (size > 100 * 10024) {
          toast.error("maximum text file size is 100Kb");
          setValue("file", "");
        }
      } else {
        setResizedImage(file);
      }
    }
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
        <label>
          Captcha
          <input
            type="text"
            {...register("captcha", {
              required: "Please enter your email address",
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
        {captchaData?.image && <img src={captchaData.image} />}
        <button
          type="button"
          onClick={() => {
            reload();
          }}
        >
          reload
        </button>
        <p>{errors.captcha?.message}</p>
        <label>
          Message
          <textarea
            {...register("text", {
              required: "Required field",
              validate: validateHtmlTags,
              // validate: (fieldValue) => fieldValue !== "111" || "not 111",
              // pattern: {
              //   value:
              //   message: "Invalid url",
              // },
            })}
            // id="message"
            placeholder="message text"
            autoComplete="off"
          />
        </label>
        <p>{errors.text?.message}</p>
        <input
          {...register("file")}
          type="file"
          accept=".png,.jpeg,.jpg,.gif,.txt"
          onChange={onChange}
          // id="file"
        />
        {resizedImage && <img src={resizedImage} alt="uploaded image" />}
        <button type="submit">Send</button>
      </form>
      {parsedText}
    </div>
  );
}
