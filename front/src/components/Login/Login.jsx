// HOOKS
import { useEffect, useRef, useState, useContext } from 'react';
// COMPONENTS
import {
  LoginAuth,
  LoginRemember,
  LoginStatus,
  LoginSubmit,
  LoginResetPasswordButton,
} from './loginIndex';
import AvatarBig from '../Common/AvatarBig';
import HeaderWithLogo from '../HeaderWithLogo';
import FooterWindowsLiveId from '../FooterWindowsLiveId';
// CONTEXT
import loginContext from '/src/contexts/LoginContext';
import globalContext from '../../contexts/GlobalContext';
// DATA
import formLoginData from '/src/data/login/formLoginData';
// HELPERS
import { getLocalStorageUsers } from "/src/helpers/handleStorage";

const Login = () => {

  const { showMenu } = useContext(globalContext);
  const formRef = useRef();

  const [formUpdate, setFormUpdate] = useState(formLoginData);
  const [resetForm, setResetForm] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isEmailOnInputSaved, setIsEmailOnInputSaved] = useState(false);
  const [storageData, setStorageData] = useState({ stored: [], current: null });

  const providerValues = {
    resetForm,
    setResetForm,
    formUpdate,
    setFormUpdate,
    isConnecting,
    setIsConnecting,
    storageData,
    setStorageData,
    isEmailOnInputSaved,
    setIsEmailOnInputSaved
  };

  useEffect(() => {
    if (resetForm) {
      setFormUpdate({ ...formLoginData });
      setResetForm(false);
    }
  }, [resetForm]);

  useEffect(() => {
    const storageUsersInfos = getLocalStorageUsers();
    const { stored, current } = storageUsersInfos;

    if (stored.length !== 0) {
      const { email, status, avatar } = current || stored[0];
      const autoAuth = current !== null;

      setStorageData(storageUsersInfos);
      setFormUpdate({
        avatar,
        email,
        password: "",
        status,
        rememberEmail: true,
        rememberPassword: true,
        autoAuth
      });
      setIsEmailOnInputSaved(true);

      if (current !== null) {
        setIsConnecting(true);
      }
    }
  }, []);

  return (
    <loginContext.Provider value={providerValues}>
      <div className={`login__container ${showMenu ? "" : "hide"}`}>
        <div className="login">
          <HeaderWithLogo />
          <form
            className={`login__form ${isConnecting ? "disabled" : ""}`}
            ref={formRef}
          >
            <AvatarBig src={formUpdate.avatar} />
            <LoginAuth />
            <LoginStatus />
            <LoginRemember />
            <LoginSubmit />
          </form>
          <LoginResetPasswordButton />
          <FooterWindowsLiveId />
        </div>
      </div>
    </loginContext.Provider >
  );
};

export default Login;