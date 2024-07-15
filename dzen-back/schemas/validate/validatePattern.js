const tagPattern = /<\/?(a|code|i|strong)(\s+[^>]*?)?>|<\/?[^>]+>/g;
const aTagPattern = /^href\s*=\s*"([^"]*)"\s+title\s*=\s*"([^"]+)"\s*$/;

const emailPattern =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const urlPattern =
  /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.,~#?&/=]*)$/;
const usernamePattern = /^[a-zA-Z0-9]+$/;
const captchaPattern = /^[a-zA-Z0-9]+$/;

module.exports = {
  tagPattern,
  aTagPattern,
  emailPattern,
  urlPattern,
  usernamePattern,
  captchaPattern,
};
