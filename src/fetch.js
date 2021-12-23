import {getCookie} from "./utils";

const fetchWrapper = function (url, options) {
  let token = getCookie("token");
  if (token) {
    token = JSON.parse(token).token;
  }
  options.headers = {
    ...options.headers,
    Authorization: "Bearer " + token,
  };

  return fetch(url, options);
};

export default fetchWrapper;
