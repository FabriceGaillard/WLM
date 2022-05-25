import React from 'react';

const LoginAuth = () => {
  return (
    <>
      <label htmlFor="email">Adresse de messagerie :</label>
      <input type="text" list="mailList" id="email" />
      <datalist id="mailList">
        <option defaultValue="example@live.fr"></option>
      </datalist>
      <label htmlFor="password">Mot de passe :</label>
      <input type="text" id="password" defaultValue="******" />
    </>
  );
};

export default LoginAuth;