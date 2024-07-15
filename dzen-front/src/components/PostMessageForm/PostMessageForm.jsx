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

const MAX_IMAGE_SIZE = { width: 320, height: 240 };

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
  const [resizedImage, setResizedImage] = useState(null);
  const { loading, data: captchaData, error, reload } = useCaptcha();

  const onSubmit = async (data) => {
    setParsedText(parse(data.text));
    console.log(sendPost);
    const response = await toast.promise(sendPost(data, captchaData), {
      pending: "Sending message",
      success: "Message sent 👌",
      error: {
        render: ({ data }) => {
          return `${data.response.data?.message}`;
        },
      },
    });
    console.log(response);
  };

  const onChange = async (event) => {
    // function fileToDataUri(field) {
    //   return new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.addEventListener("load", () => {
    //       resolve(reader.result);
    //     });
    //     reader.readAsDataURL(field);
    //   });
    // }
    if (event.target.files.length) {
      const file = event.target.files[0];
      const { type, size } = file;
      console.log(size);
      if (type === "text/plain" && size > 100 * 10024) {
        toast.error("maximum text file size is 100Kb");
        setValue("file", "");
      } else {
        const src = URL.createObjectURL(file);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (fileReaderEvent) => {
          const imageAsBase64 = fileReaderEvent.target.result;
          const originalImage = document.createElement("img");
          originalImage.src = imageAsBase64;
          const resizingFactor =
            (originalImage.height * MAX_IMAGE_SIZE.width) /
              originalImage.width >
            MAX_IMAGE_SIZE.height
              ? MAX_IMAGE_SIZE.height / originalImage.height
              : MAX_IMAGE_SIZE.width / originalImage.width;

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          // const originalWidth = imgToCompress.width;
          // const originalHeight = imgToCompress.height;

          const canvasWidth = originalImage.width * resizingFactor;
          const canvasHeight = originalImage.height * resizingFactor;

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          context.drawImage(
            originalImage,
            0,
            0,
            originalImage.width * resizingFactor,
            originalImage.height * resizingFactor
          );

          // reducing the quality of the image
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setResizedImage(URL.createObjectURL(blob));
                // resizedImage.src = URL.createObjectURL(resizedImageBlob);
              }
            },
            "image/jpeg",
            80
          );
        };

        // originalImage.src = src;
        // setResizedImage(src);
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
