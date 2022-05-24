// HOOKS
import { useContext } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';
// COMPONENTS
import { LoginRememberEmail, LoginRememberPassword, LoginAuto } from '../loginIndex';

const LoginRemember = () => {

  const { isConnecting } = useContext(loginContext);

  return (

    <div className="login-remember__container">
      {isConnecting
        ? (
          <div className="connecting-gif__container">
            <div>Connexion...</div>
            <img className="connecting-gif" src="./assets/loading_anim.gif" alt="connecting gif animation" />
          </div>
        )
        : (
          <>
            <LoginRememberEmail />
            <LoginRememberPassword />
            <LoginAuto />
          </>
        )
      }
    </div>
  );

};

export default LoginRemember;