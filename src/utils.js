import {login} from "./services/userService";

export const handleError = (error) => {
    if (error.status === 401) {
        eraseCookie('auth_token');
        eraseCookie('token');
        document.location.pathname = '/';
    }
    console.log(JSON.stringify(error))
}

export function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

export const getCookie = (name) => {
    let matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value = "", options = {}) => {
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
};
