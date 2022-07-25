// HOOKS
import { useRef, useEffect, useContext, useCallback } from 'react';
// CONTEXT 
import loginContext from '/src/contexts/LoginContext';
// HELPERS
import clickOutside from '/src/helpers/clickOutside';
// DATA
import statusList from '/src/data/login/statusList';

const LoginStatusList = (props) => {

  const { setShowStatusList, dropDownButtonTarget, setDropDownButtonTarget, classShow } = props;

  const statusContainerRef = useRef();
  const { formUpdate, setFormUpdate } = useContext(loginContext);

  const handleClick = ({ currentTarget }) => {
    const { status } = currentTarget.dataset;

    setShowStatusList(false);
    setFormUpdate({ ...formUpdate, status });
  };

  const clickOutsideStatusHandler = useCallback(({ target }) => {
    console.log("🚀 ~ file: LoginStatusList.jsx ~ line 26 ~ clickOutsideStatusHandler");

    const options = [
      statusContainerRef,
      setShowStatusList,
      dropDownButtonTarget,
      target,
    ];
    clickOutside(...options);

    const isClickingOnStatus = statusContainerRef.current.contains(target);
    const isClickingOnButton = dropDownButtonTarget.contains(target);

    if (isClickingOnStatus === true || isClickingOnButton === false) {
      setDropDownButtonTarget(null);
      document.removeEventListener('click', clickOutsideStatusHandler);
    }
  }, [dropDownButtonTarget]);

  useEffect(() => {
    if (dropDownButtonTarget) {
      document.addEventListener('click', clickOutsideStatusHandler);
    }

    return () => {
      document.removeEventListener('click', clickOutsideStatusHandler);
    };
  }, [dropDownButtonTarget]);

  return (
    <ul className={"login-status__list " + classShow} ref={statusContainerRef}>
      {Object.values(statusList)
        .map((status, index) => (
          <li key={index} onClick={handleClick} data-status={status.key}>
            <div className="status-img__container">
              <img
                className="notHover"
                src={status.icon}
                alt={"Icône représentant le status: " + status.sentence}
              />
              <img
                className="hover"
                src={status.inconHover}
                alt={"Icône représentant le status: " + status.sentence + " au survol"}
              />
            </div>
            <span>{status.sentence}</span>
          </li>
        ))}
    </ul>
  );
};

export default LoginStatusList;