import { useState } from 'react';
import { LoginAuthEmailList, LoginAuthEmailInput } from '../loginIndex';
import { fakeEmailList } from '../../../data.js/tempData';

const LoginAuthEmail = () => {
  const [showEmailsList, setShowEmailsList] = useState(false);
  const [emailPlaceHolder, setEmailPlaceHolder] = useState(fakeEmailList[0] || '');

  const handleEmailList = event => {
    event.preventDefault();
    setShowEmailsList(previous => !previous);
  };

  const useAnotherId = () => {
    console.log('Utiliser un autre identifiant Windows Live ID');
    setShowEmailsList(false);
  };

  return (
    <div className="login-email-__container">
      <LoginAuthEmailInput
        handleEmailList={handleEmailList}
        emailPlaceHolder={emailPlaceHolder}
      />
      {showEmailsList && (
        <ul className="login-email__list">
          {fakeEmailList.map((email, idx) => (
            <LoginAuthEmailList
              key={idx}
              email={email}
              setShowEmailsList={setShowEmailsList}
              setEmailPlaceHolder={setEmailPlaceHolder}
            />
          ))}
          <li onClick={useAnotherId}>Utiliser un autre identifiant Windows Live ID</li>
        </ul>
      )}
    </div>
  );
};

export default LoginAuthEmail;