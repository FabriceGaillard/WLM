// HOOKS
import { useEffect, useState } from "react";
// COMPONENTS
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
// CONTEXT 
import PersonalSpaceContext from '../../contexts/PersonalSpaceContext';
// HELPERS
import { getLocalStorageSettings, addStorageSettings } from '../../helpers/handleStorage';

const PersonalSpace = () => {

  const [settings, setSettings] = useState((getLocalStorageSettings()));
  const [emptySearchResult, setEmptySearchResult] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => setFirstRender(false), []);

  useEffect(() => {
    if (firstRender === false) {
      addStorageSettings(settings);
    }
  }, [settings]);

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