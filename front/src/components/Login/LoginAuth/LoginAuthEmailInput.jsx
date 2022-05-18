// HOOKS
import { useContext } from 'react';
// ICONS
import ArrowIcon from '../../../icons/dropDownArrow';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';

const LoginAuthEmailInput = (props) => {

  const { handleEmailList } = props;
  const { resetForm, formUpdate, setFormUpdate } = useContext(loginContext);

  return (
    <>
      <label htmlFor="emailLogin">Adresse de messagerie :</label>
      <div className="email-input__container">
        <input
          type="email"
          autoComplete="off"
          id="emailLogin"
          value={formUpdate.email}
          onChange={({ target }) => setFormUpdate({ ...formUpdate, email: target.value })}
        />
        <button type="button" className="dropdown_btn" onClick={handleEmailList}>
          < ArrowIcon />
        </button>
      </div>
    </>
  );
};

export default LoginAuthEmailInput;