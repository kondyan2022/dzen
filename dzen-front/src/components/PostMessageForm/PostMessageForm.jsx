import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  captchaPattern,
  emailPattern,
  urlPattern,
  usernamePattern,
} from "../../utils/validate";
import { useCaptcha } from "../../hooks";
import { sendPost } from "../../api";
import { useResizedImage } from "../../hooks/useResizedImage";
import { PostMessageFormWrapper, SubmitButton } from "./PostMessageForm.styled";
import {
  CloseCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FileTextOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { TextareaInput } from "./TextareaInput";
// import { resizedImageIfNeed } from "../../utils";

export const PostMessageForm = ({
  level = 0,
  parentId,
  handleClose,
  handleCloseAfterSubmit,
}) => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    setValue,
    formState: { errors },
  } = methods;

  const [resizedImage, setResizedImage, ratio] = useResizedImage();
  const { data: captchaData, reload } = useCaptcha();
  const [haveTextFile, setHaveTextFile] = useState(false);

  const onSubmit = async (data) => {
    if (parentId) {
      data["parentId"] = parentId;
    }
    await toast.promise(sendPost(data, captchaData, resizedImage, ratio), {
      pending: "Sending message",
      success: {
        render: () => {
          handleCloseAfterSubmit();
          return "Message sent 👌";
        },
      },
      error: {
        render: ({ data }) => {
          reload();
          setValue("captcha", "");
          return `${data.response?.data?.message}. Try again!`;
        },
      },
    });
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
        setHaveTextFile(true);
      } else {
        setHaveTextFile(false);
        setResizedImage(file);
      }
    }
  };

  return (
    <FormProvider {...methods}>
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
            <TextareaInput />
            {/* <p>{errors.text?.message}</p> */}
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

              <SubmitButton type="submit">Send</SubmitButton>
            </div>
            <label className="add-file-label">
              <span>
                {haveTextFile && <FileTextOutlined style={{ fontSize: 24 }} />}
                {resizedImage && <FileImageOutlined style={{ fontSize: 24 }} />}
                {haveTextFile || resizedImage ? (
                  <DeleteOutlined
                    onClick={() => {
                      setHaveTextFile(false);
                      setResizedImage(null);
                      setValue("files", null);
                    }}
                  />
                ) : (
                  <CloudUploadOutlined />
                )}
              </span>
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

            {/* <div>{parsedText}</div> */}
          </div>
        </form>
      </PostMessageFormWrapper>
    </FormProvider>
  );
};
