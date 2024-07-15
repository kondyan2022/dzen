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
  data = { ...data, file: data.file[0] };

  const result = await axiosInstance.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};
