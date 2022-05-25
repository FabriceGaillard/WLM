// HOOKS
import { useContext, useRef } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';

const LoginRememberPassword = () => {

  const { formUpdate, setFormUpdate } = useContext(loginContext);
  const passwordCheckRef = useRef();

  const handleRememberPassword = () => {
    const { checked } = passwordCheckRef.current;
    setFormUpdate(prev => ({ ...prev, rememberPassword: checked }));
  };

  return (
    <div className="remember__container">
      <input
        type="checkbox"
        id="remember-password"
        ref={passwordCheckRef}
        onChange={handleRememberPassword}
        checked={formUpdate.rememberPassword}
      />
      <label htmlFor="remember_password">Mémoriser mon mot de passe</label>
    </div>
  );
};

export default LoginRememberPassword;