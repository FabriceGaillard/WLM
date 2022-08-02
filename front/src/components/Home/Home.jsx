// HOOKS
import { useContext, useEffect, useState } from "react";
// COMPONENTS
import Contacts from "./Contacts/Contacts";
import User from "./User/User";
import HeaderWithLogo from "../HeaderWithLogo";
// CONTEXT 
import homeContext from '../../contexts/homeContext';
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
    <homeContext.Provider value={{ settings, setSettings }}>
      <div className="home__container">
        <div className="home">
          <HeaderWithLogo />
          <User />
          <Contacts />
        </div>
      </div>
    </homeContext.Provider>
  );
};

export default Home;