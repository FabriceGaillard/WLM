import {
  askResetPasswordApiUrl,
  getResetPasswordApiUrl
} from '../../data/apiUrls';

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
