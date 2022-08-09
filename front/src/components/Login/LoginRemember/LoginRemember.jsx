// HOOKS
import { useContext } from 'react';
// CONTEXT
import loginContext from '/src/contexts/LoginContext';
// COMPONENTS
import { LoginRememberEmail, LoginRememberPassword, LoginAuto } from '../loginIndex';
// ICONS
import loader from "/assets/loading_anim.gif";

const LoginRemember = () => {

  const { isConnecting } = useContext(loginContext);

  return (

    <div className="login-remember__container">
      {!isConnecting && (
        <>
          <LoginRememberEmail />
          <LoginRememberPassword />
          <LoginAuto />
        </>
      )}
      <div className={`connecting-gif__container ${isConnecting ? "display-flex" : "display-none"}`}>
        <div>Connexion...</div>
        <img
          className="connecting-gif"
          src={loader}
          alt="connecting gif animation"
        />
      </div>
    </div>
  );

};

export default LoginRemember;