import options from '../../data/fetchOptions';
import {
  loginApiUrl,
  userInfosApiUrl
} from '../../data/apiUrls';

export const fetchLogin = async (data, currentAbortController) => {

  const optionsLogin = {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal: currentAbortController.signal
  };

  const response = await fetch(loginApiUrl, optionsLogin);
  if (response.ok === false) {
    throw new Error("Informations incorrectes");
  }
  const userData = await response.json();

  return userData;
};

export const fetchMeFromLogin = async (currentAbortController) => {
  const optionsMe = {
    ...options,
    signal: currentAbortController.signal
  };

  const response = await fetch(userInfosApiUrl, optionsMe);
  if (response.ok === false) {
    throw new Error("Non authentifié");
  }

  const userData = await response.json();
  return userData;
};