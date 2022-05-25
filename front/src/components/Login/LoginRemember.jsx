import React from 'react';

const LoginRemember = () => {
  return (
    <>
      <div className="remember__container">
        <input type="checkbox" id="remember-email" defaultChecked />
        <label htmlFor="remember_email">Mémoriser mon adresse</label>
        <button id="delete-saved__password">(Effacer)</button>
      </div>
      <div className="remember__container">
        <input type="checkbox" id="remember-password" defaultChecked />
        <label htmlFor="remember_password">Mémoriser mon mot de passe</label>
      </div>
    </>
  );
};

export default LoginRemember;