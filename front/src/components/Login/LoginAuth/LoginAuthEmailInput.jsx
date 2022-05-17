import ArrowIcon from '../../../icons/dropDownArrow';
import { fakeEmailList } from '../../../data.js/tempData';

const LoginAuthEmailInput = (props) => {

  const { handleEmailList, emailValue, setEmailValue } = props;

  return (
    <>
      <label htmlFor="emailLogin">Adresse de messagerie :</label>
      <div className="email-input__container">
        <input
          type="email"
          autoComplete="off"
          id="emailLogin"
          value={emailValue || fakeEmailList[0]}
          onChange={({ target }) => setEmailValue(target.value)}
        />
        <button onClick={handleEmailList}>
          < ArrowIcon />
        </button>
      </div>
    </>
  );
};

export default LoginAuthEmailInput;