// import { dataURI2Blob } from "../utils";
import { axiosInstance } from "./axiosInstance";

export const sendPost = async (data, captchaData) => {
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
  let dataForSend = { ...data, file: data.file[0] };
  // const formData = new FormData();
  // if (imageUri) {
  //   const file = dataURI2Blob(imageUri);

  //   for (let key of Object.keys(data)) {
  //     if (key === "file") {
  //       formData.append("file", file, file.name);
  //       continue;
  //     }
  //     formData.append(key, data[key]);
  //   }
  //   dataForSend = formData;
  // }

  const result = await axiosInstance.post("/posts", dataForSend, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};
