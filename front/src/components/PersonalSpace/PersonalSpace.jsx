// HOOKS
import { useEffect, useState } from "react";
// COMPONENTS
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
// CONTEXT 
import PersonalSpaceContext from '../../contexts/PersonalSpaceContext';
// HELPERS
import { getLocalStorageSettings, addStorageSettings } from '../../helpers/handleStorage';
import defaultStorageSettings from '../../data/home/defaultStorageSettings';

const PersonalSpace = () => {

  const [settings, setSettings] = useState(null);
  const [emptySearchResult, setEmptySearchResult] = useState(false);

  useEffect(() => {
    const localStorageSettings = getLocalStorageSettings();

    addStorageSettings(localStorageSettings || defaultStorageSettings);
    setSettings(localStorageSettings || defaultStorageSettings);
  }, []);

  return (
    <PersonalSpaceContext.Provider value={{ settings, setSettings, emptySearchResult, setEmptySearchResult }}>
      <div className="personal-space">
        <Home />
        <Chat />
      </div>
    </PersonalSpaceContext.Provider>
  );
};

export default PersonalSpace;