
// HOOKS
import { useContext } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';

const LoginAuthPassword = () => {

  const { formUpdate, setFormUpdate, isConnecting } = useContext(loginContext);


  return (
    <div className="login-password__container">
      <label htmlFor="password">Mot de passe :</label>
      <input
        type="password"
        autoComplete="new-password"
        id="password"
        disabled={isConnecting}
        onChange={({ target }) => setFormUpdate({ ...formUpdate, password: target.value })}
        value={formUpdate.password}
      />
    </div>
  );
};

export default LoginAuthPassword;