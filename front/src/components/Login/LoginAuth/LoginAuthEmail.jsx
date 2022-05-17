import { useState, useRef } from 'react';
import { LoginAuthEmailList, LoginAuthEmailInput } from '../loginIndex';

const LoginAuthEmail = () => {

  const [showEmailsList, setShowEmailsList] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);
  const [emailValue, setEmailValue] = useState(null);

  const handleEmailList = event => {
    event.preventDefault();
    setDropDownButtonTarget(event.target);
    setShowEmailsList(previous => !previous);
  };

  return (
    <div className="login-email-__container">
      <LoginAuthEmailInput
        handleEmailList={handleEmailList}
        emailValue={emailValue}
        setEmailValue={setEmailValue}
      />
      {showEmailsList && (
        <LoginAuthEmailList
          setShowEmailsList={setShowEmailsList}
          dropDownButtonTarget={dropDownButtonTarget}
          setEmailValue={setEmailValue}
        />
      )}
    </div>
  );
};

export default LoginAuthEmail;