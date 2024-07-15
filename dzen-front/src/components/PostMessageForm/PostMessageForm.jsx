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
import { axiosInstance } from "../../api/axiosInstance";

export function PostMessageForm() {
  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    // setValue,
    formState: { errors },
  } = useForm();
  const [parsedText, setParsedText] = useState(null);
  const { loading, data: captchaData, error, reload } = useCaptcha();

  const sendPost = async (data) => {
    const { uuid } = captchaData;
    const {
      data: { token },
    } = await axiosInstance.post("/captcha/check", {
      uuid,
      text: data.captcha,
    });
    delete data.captcha;
    if (!data.homepage) {
      delete data.homepage;
    }
    const result = await axiosInstance.post("/posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  };

  const onSubmit = async (data) => {
    console.log(">>>>>>", data);
    setParsedText(parse(data.text));
    const response = await toast.promise(sendPost(data), {
      pending: "Sending message",
      success: "Message sent 👌",
      error: {
        render: ({ data }) => {
          return `${data.response.data.message}`;
        },
      },
    });
    console.log(response);
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

        <button type="submit">Send</button>
      </form>
      {parsedText}
    </div>
  );
}
