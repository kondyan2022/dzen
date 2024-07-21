import { urlToFile } from "../utils/urlToFile";
import { axiosInstance } from "./axiosInstance";
import { endpoints } from "./endpoints";

export const sendPost = async (data, captchaData, resizedImage, ratio) => {
  const { uuid } = captchaData;
  const {
    data: { token },
  } = await axiosInstance.post(endpoints.captcha.checkCaptcha, {
    uuid,
    text: data.captcha,
  });
  delete data.captcha;
  if (!data.homepage) {
    delete data.homepage;
  }

  const dataForSend = { ...data };
  if (data.file.length) {
    if (ratio === 1) {
      dataForSend.file = urlToFile(resizedImage);
    } else {
      dataForSend.file = data.file[0];
    }
  }

  const result = await axiosInstance.post(
    endpoints.posts.addPost,
    dataForSend,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
};
