export const tagPattern = /<\/?(a|code|i|strong)(\s+[^>]*?)?>|<\/?[^>]+>/g;
export const aTagPattern = /^href\s*=\s*"([^"]*)"\s+title\s*=\s*"([^"]+)"\s*$/;

export const emailPattern =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const urlPattern =
  /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.,~#?&/=]*)$/;
export const usernamePattern = /^[a-zA-Z0-9]+$/;
export const captchaPattern = /^[a-zA-Z0-9]+$/;
