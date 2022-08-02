import {
  loginApiUrl,
  userInfosApiUrl,
  askResetPasswordApiUrl,
  getResetPasswordApiUrl,
  userRelationshipsApiUrl,
  logoutApiUrl
} from '../data/apiUrls';

let options = { credentials: "include" };

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

export const fetchMe = async () => {
  const response = await fetch(userInfosApiUrl, options);
  if (response.ok === false) {
    throw new Error("Non authentifié");
  }

  const userData = await response.json();
  return userData;
};

export const fetchAskResetPassword = async (email) => {
  const response = await fetch(askResetPasswordApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (response.ok === false) {
    throw new Error("Erreur lors de la requête");
  }
};

export const fetchResetPassword = async (endpoint, data) => {
  const optionsLogin = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(getResetPasswordApiUrl(endpoint), optionsLogin);
  if (response.ok === false) {
    throw new Error("Erreur lors de la requête");
  }
};

export const fetchContacts = async () => {
  const response = await fetch(userRelationshipsApiUrl, options);
  const users = await response.json();
  return users;
};

export const fetchLogout = async () => {
  await fetch(logoutApiUrl, options);
};