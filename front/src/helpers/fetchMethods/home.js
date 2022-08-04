import { userInfosApiUrl, logoutApiUrl } from '../../data/apiUrls';
import options from '../../data/fetchOptions';

export const fetchMe = async () => {
  const response = await fetch(userInfosApiUrl, options);
  if (response.ok === false) {
    throw new Error("Non authentifié");
  }

  const userData = await response.json();
  return userData;
};

export const fetchLogout = async () => {
  await fetch(logoutApiUrl, options);
};