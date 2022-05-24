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

  const handleStatusList = ({ currentTarget }) => {
    setDropDownButtonTarget(currentTarget);
    setShowStatusList(previous => !previous);
  };

  return (
    <div className="status__container">
      <div className="status-title">Statut :</div>
      <button type="button" className={`status-select${showStatusList ? " border" : ""}`} onClick={handleStatusList}>
        {currentStatus}
        <div className='dropdown' id="dropDownStatus">
          < ArrowIcon />
        </div>
      </button>
      <LoginStatusList
        classShow={showStatusList ? "show-list" : "hide-list"}
        setShowStatusList={setShowStatusList}
        setCurrenStatus={setCurrenStatus}
        dropDownButtonTarget={dropDownButtonTarget}
        showStatusList={showStatusList}
      />
    </div>
  );

};

export default LoginStatus;