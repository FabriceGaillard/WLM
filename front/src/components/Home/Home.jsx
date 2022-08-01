// HOOKS
import { useContext, useEffect, useState } from "react";
// COMPONENTS
import Contacts from "./Contacts/Contacts";
import User from "./User/User";
import HeaderWithLogo from "../HeaderWithLogo";
// CONTEXT 
import settingsContext from '../../contexts/settingsContext';
// HELPERS
import { getLocalStorageSettings, addStorageSettings } from '../../helpers/handleStorage';
// DATA
import defaultStorageSettings from '../../data/home/defaultStorageSettings';

const Home = () => {

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const localStorageSettings = getLocalStorageSettings();

    addStorageSettings(localStorageSettings || defaultStorageSettings);
    setSettings(localStorageSettings || defaultStorageSettings);
  }, []);

  return (
    <settingsContext.Provider value={{ settings, setSettings }}>
      <div className="home__container">
        <div className="home">
          <HeaderWithLogo />
          <User />
          <Contacts />
        </div>
      </div>
    </settingsContext.Provider>
  );
};

export default Home;