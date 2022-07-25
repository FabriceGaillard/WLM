// HOOKS
import { useState, useContext } from 'react';
// COMPONENTS
import { LoginStatusList } from '../loginIndex';
// CONTEXT
import loginContext from '/src/contexts/LoginContext';
// DATA
import statusList from '/src/data/login/statusList';
// ICONS
import ArrowIcon from '/src/icons/dropDownArrow';

const LoginStatus = () => {

  const { formUpdate } = useContext(loginContext);

  const [showStatusList, setShowStatusList] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleStatusList = ({ currentTarget }) => {
    setDropDownButtonTarget(currentTarget);
    setShowStatusList(previous => !previous);
  };

  return (
    <div className="status__container">
      <div className="status-title">Statut :</div>
      <button
        type="button"
        className={`status-select${showStatusList ? " border" : ""}`}
        onClick={handleStatusList}
        title="Sélectionnez le statut que vos contacts
        verront s'afficher après votre connexion."
      >
        {statusList[formUpdate.status].sentence}
        <div className='dropdown' id="dropDownStatus">
          < ArrowIcon />
        </div>
      </button>
      <LoginStatusList
        classShow={showStatusList ? "display-flex" : "display-none"}
        {... { showStatusList, setShowStatusList, dropDownButtonTarget, setDropDownButtonTarget }}
      />
    </div>
  );

};

export default LoginStatus;