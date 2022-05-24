// HOOKS
import { useRef, useContext, useEffect } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';
// DATA
import { fakeEmailList } from '../../../data.js/tempData';
// HELPERS
import clickOutside from '../../../helpers/clickOutside';

const LoginAuthEmailList = (props) => {
  const { setShowEmailsList, dropDownButtonTarget } = props;

  const { setResetForm, formUpdate, setFormUpdate } = useContext(loginContext);

  const listContainerRef = useRef();

  const handleClick = ({ target }) => {
    const { innerText: targetEmail } = target;
    setFormUpdate({ ...formUpdate, email: targetEmail });
    setShowEmailsList(false);
  };

  const useAnotherId = () => {

    console.log('Utiliser un autre identifiant Windows Live ID');
    setResetForm(true);
    setShowEmailsList(false);
  };

  const clickOutsideHandler = e => {
    const options = [
      listContainerRef,
      setShowEmailsList,
      dropDownButtonTarget,
      e.target
    ];

    clickOutside(...options);
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, []);



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