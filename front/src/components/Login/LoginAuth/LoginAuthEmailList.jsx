import { useRef } from 'react';
import { fakeEmailList } from '../../../data.js/tempData';
import clickOutside from '../../../helpers/clickOutside';

const LoginAuthEmailList = (props) => {
  const { setShowEmailsList, dropDownButtonTarget, setEmailValue } = props;

  const listContainerRef = useRef();

  const handleClick = ({ target }) => {
    const { innerText: targetEmail } = target;
    setEmailValue(targetEmail);
    setShowEmailsList(false);
  };

  const useAnotherId = () => {
    console.log('Utiliser un autre identifiant Windows Live ID');
    setShowEmailsList(false);
  };

  clickOutside(listContainerRef, setShowEmailsList, dropDownButtonTarget);

  return (
    <ul className="login-email__list" ref={listContainerRef}>
      {fakeEmailList.map((email, idx) => (
        <li key={idx} onClick={handleClick}>{email}</li>
      ))}
      <li onClick={useAnotherId}>Utiliser un autre identifiant Windows Live ID</li>
    </ul>
  );
};

export default LoginAuthEmailList;