// HOOKS
import { useContext } from 'react';
// CONTEXT
import loginContext from '../../contexts/LoginContext';

const LoginSubmit = () => {

  const { isConnecting, setIsConnecting } = useContext(loginContext);

  const handleLoginSubmit = () => {
    isConnecting
      ? setIsConnecting(false)
      : setIsConnecting(true);
  };

  return (
    <input
      type="submit"
      value={isConnecting ? "Annuler" : "Connexion"}
      id="connect__btn"
      onClick={handleLoginSubmit}
    />
  );

};

export default LoginSubmit;