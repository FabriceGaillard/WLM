import { useState, useRef } from 'react';
import { LoginAuthEmailList, LoginAuthEmailInput } from '../loginIndex';
import { fakeEmailList } from '../../../data.js/tempData';
import clickOutside from '../../../helpers/clickOutside';

const LoginAuthEmail = () => {

  const [showEmailsList, setShowEmailsList] = useState(false);
  const [emailPlaceHolder, setEmailPlaceHolder] = useState(fakeEmailList[0] || '');
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);
  const listContainerRef = useRef();

  const handleEmailList = event => {
    event.preventDefault();
    setDropDownButtonTarget(event.target);
    setShowEmailsList(previous => !previous);
  };

  const useAnotherId = () => {
    console.log('Utiliser un autre identifiant Windows Live ID');
    setShowEmailsList(false);
  };

  clickOutside(listContainerRef, setShowEmailsList, dropDownButtonTarget);

  return (
    <div className="login-email-__container">
      <LoginAuthEmailInput
        handleEmailList={handleEmailList}
        emailPlaceHolder={emailPlaceHolder}
      />
      {showEmailsList && (
        <ul className="login-email__list" ref={listContainerRef}>
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