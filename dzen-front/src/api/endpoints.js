export const captcha = {
  getCaptcha: "/captcha",
  checkCaptcha: "/captcha/check",
};

export const posts = {
  getAll: "/posts",
  getByParentId: (id) => `/posts/:${id}`,
};
