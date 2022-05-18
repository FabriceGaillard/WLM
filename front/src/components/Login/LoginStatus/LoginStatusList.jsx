import clickOutside from '../../../helpers/clickOutside';
import statusList from '../../../data.js/statusList';
import { useRef } from 'react';

const LoginStatusList = (props) => {

  const { setCurrenStatus, setShowStatusList, dropDownButtonTarget } = props;

  const statusContainerRef = useRef();

  const handleClick = ({ target }) => {
    const { innerText: targetStatus } = target;
    setCurrenStatus(targetStatus);
    setShowStatusList(false);
  };

  clickOutside(statusContainerRef, setShowStatusList, dropDownButtonTarget);

  return (
    <ul className="login-status__list" ref={statusContainerRef}>
      {statusList
        .map((status, index) => (
          <li key={index} onClick={handleClick}>
            <div className="status-img__container">
              <img className="notHover" src={status.icon} />
              <img className="hover" src={status.inconHover} />
            </div>
            <span>{status.sentence}</span>
          </li>
        ))}
    </ul>
  );
};

export default LoginStatusList;