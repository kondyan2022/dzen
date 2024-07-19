export const endpoints = {
  captcha: {
    getCaptcha: "/captcha",
    checkCaptcha: "/captcha/check",
  },
  posts: {
    getAll: "/posts",
    getByParentId: (id) => `/posts/${id}`,
    addPost: "/posts",
  },
};
