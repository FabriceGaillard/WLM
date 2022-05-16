import ArrowIcon from '../../../icons/dropDownArrow';

const LoginAuthEmailInput = ({ handleEmailList, emailPlaceHolder }) => {
  return (
    <>
      <label htmlFor="emailLogin">Adresse de messagerie :</label>
      <div className="email-input__container">
        <input type="email" list="mailList" id="emailLogin"
          placeholder={emailPlaceHolder}
        />
        <button onClick={handleEmailList}>
          < ArrowIcon />
        </button>
      </div>
    </>
  );
};

export default LoginAuthEmailInput;