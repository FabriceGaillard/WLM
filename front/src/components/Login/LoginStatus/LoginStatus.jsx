// HOOKS
import { useState } from 'react';
// COMPONENTS
import { LoginStatusList } from '../loginIndex';
// DATA
import statusList from '../../../data.js/statusList';
// ICONS
import ArrowIcon from '../../../icons/dropDownArrow';

const LoginStatus = () => {

  const [currentStatus, setCurrenStatus] = useState([statusList[0].sentence]);
  const [showStatusList, setShowStatusList] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleStatusList = ({ target }) => {
    setDropDownButtonTarget(target);
    setShowStatusList(previous => !previous);
  };

  return (
    <div className="status__container">
      <div className="status-title">Statut :</div>
      <div className="status-select">
        {currentStatus}
        <button type="button" className='dropdown_btn' onClick={handleStatusList}>
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