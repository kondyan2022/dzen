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
  let dataForSend = {
    ...data,
    file: ratio === 1 ? data.file[0] : urlToFile(resizedImage),
  };

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
