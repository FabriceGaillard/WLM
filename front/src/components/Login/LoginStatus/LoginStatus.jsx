import { useEffect, useState } from 'react';
import statusList from '../../../data.js/statusList';
import ArrowIcon from '../../../icons/dropDownArrow';
import LoginStatusList from './LoginStatusList';

const LoginStatus = () => {

  const [currentStatus, setCurrenStatus] = useState([statusList[0].sentence]);
  const [showStatusList, setShowStatusList] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleStatusList = event => {
    event.preventDefault();
    setDropDownButtonTarget(event.target);
    setShowStatusList(previous => !previous);
  };

  return (
    <div className="status__container">
      <div className="status-title">Statut :</div>
      <div className="status-select">
        {currentStatus}
        <button className='dropdown_btn' onClick={handleStatusList}>
          < ArrowIcon />
        </button>
      </div>

      {showStatusList && (
        <LoginStatusList
          setShowStatusList={setShowStatusList}
          setCurrenStatus={setCurrenStatus}
          dropDownButtonTarget={dropDownButtonTarget}
        />
      )}
    </div>
  );

};

export default LoginStatus;