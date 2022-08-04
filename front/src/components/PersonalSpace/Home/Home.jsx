// HOOKS
import { useContext, useEffect, useState } from "react";
// COMPONENTS
import Contacts from "./Contacts/Contacts";
import User from "./User/User";
import HeaderWithLogo from "../../HeaderWithLogo";
// CONTEXT 
import homeContext from '../../../contexts/homeContext';
import globalContext from '../../../contexts/GlobalContext';
// HELPERS
import { getLocalStorageSettings, addStorageSettings } from '../../../helpers/handleStorage';
// DATA
import defaultStorageSettings from '../../../data/home/defaultStorageSettings';

const Home = () => {

  const { showMenu } = useContext(globalContext);

  const [settings, setSettings] = useState(null);
  const [emptySearchResult, setEmptySearchResult] = useState(false);

  useEffect(() => {
    const localStorageSettings = getLocalStorageSettings();

    addStorageSettings(localStorageSettings || defaultStorageSettings);
    setSettings(localStorageSettings || defaultStorageSettings);
  }, []);

  return (
    <homeContext.Provider value={{ settings, setSettings, emptySearchResult, setEmptySearchResult }}>
      <div className={`home ${showMenu ? "" : "hide"}`} showMenu>
        <HeaderWithLogo />
        <User />
        <Contacts />
      </div>
    </homeContext.Provider>
  );
};

export default Home;