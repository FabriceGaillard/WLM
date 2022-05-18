// HOOKS
import { useEffect, useRef, useState } from 'react';
// COMPONENTS
import {
  LoginAuth,
  LoginAuto,
  LoginImage,
  LoginRemember,
  LoginStatus,
  LoginSubmit
} from './loginIndex';
// CONTEXT
import loginContext from '../../contexts/LoginContext';
// DATA
import formLoginData from '../../data.js/formLoginData';

const Login = () => {

  const [formUpdate, setFormUpdate] = useState({ ...formLoginData });
  const [resetForm, setResetForm] = useState(false);
  const formRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    console.log('submit');
  };

  useEffect(() => {
    if (resetForm) {
      setFormUpdate({ ...formLoginData });
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <loginContext.Provider value={{ resetForm, setResetForm, formUpdate, setFormUpdate }}>
      <div className="login__container">
        <form className="login__container__form" ref={formRef} onSubmit={handleSubmit}>
          <LoginImage />
          <LoginAuth />
          <LoginStatus />
          <LoginRemember />
          <LoginAuto />
          <LoginSubmit />
        </form>
      </div>
    </loginContext.Provider>
  );
};

export default Login;