// HOOKS
import { useContext } from 'react';
// ICONS
import ArrowIcon from '../../../icons/dropDownArrow';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';

const LoginAuthEmailInput = (props) => {

  const { handleEmailList } = props;
  const { formUpdate, setFormUpdate, isConnecting } = useContext(loginContext);

  return (
    <>
      <label htmlFor="emailLogin">Adresse de messagerie :</label>
      <div className="email-input__container">
        <input
          type="email"
          id="emailLogin"
          disabled={isConnecting}
          value={formUpdate.email}
          onChange={({ target }) => setFormUpdate({ ...formUpdate, email: target.value })}
        />
        <button type="button" className="dropdown" onClick={handleEmailList}>
          < ArrowIcon />
        </button>
      </div>
    </>
  );
};

export default LoginAuthEmailInput;