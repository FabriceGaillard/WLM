const LoginAuthPassword = () => {
  return (
    <div className="login-password-input__container">
      <label htmlFor="password">Mot de passe :</label>
      <input type="text" id="password" defaultValue="******" />
    </div>
  );
};

export default LoginAuthPassword;