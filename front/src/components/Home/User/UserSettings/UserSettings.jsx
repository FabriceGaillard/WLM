// HOOKS
import { useState, useContext, useRef } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';
// COMPONENTS
import { UserSettingsList } from "../userIndex";
// DATA
import statusList from '../../../../data/login/statusList';
// ICONS
import ArrowIcon from '../../../../icons/dropDownArrow';

const UserSettings = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const userSettingsButtonRef = useRef(null);

  const [showSettings, setShowSettings] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleUserSettings = ({ currentTarget }) => {
    if (showSettings) {
      userSettingsButtonRef.current.blur();
    }

    setDropDownButtonTarget(currentTarget);
    setShowSettings(previous => !previous);
  };

  return (
    <div className="user__container-settings">
      <button
        type="button"
        title="Cliquez ici pour modifier votre pseudo, status ou image perso."
        ref={userSettingsButtonRef}
        className={`status-select${showSettings ? " border" : ""}`}
        onClick={handleUserSettings}>
        <span className="user__pseudo"><b>{userDataFromDb.username}</b></span>
        <span className="button-sentence">({statusList[userDataFromDb.status].sentence})</span>
        <div className="user__container-dropdown" id="dropDownStatus">
          < ArrowIcon />
        </div>
      </button>
      <UserSettingsList
        classShow={showSettings ? "display-flex" : "display-none"}
        {...{ showSettings, setShowSettings, dropDownButtonTarget, setDropDownButtonTarget }}
      />
    </div>
  );
};

export default UserSettings;