import {
  userInfosApiUrl,
  userRelationshipsApiUrl,
  logoutApiUrl
} from '../../data/apiUrls';

import options from '../../data/fetchOptions';

export const fetchMe = async () => {
  const response = await fetch(userInfosApiUrl, options);
  if (response.ok === false) {
    throw new Error("Non authentifié");
  }

  const userData = await response.json();
  return userData;
};

export const fetchContacts = async () => {
  const response = await fetch(userRelationshipsApiUrl, options);
  const users = await response.json();
  return users;
};

export const fetchLogout = async () => {
  await fetch(logoutApiUrl, options);
};