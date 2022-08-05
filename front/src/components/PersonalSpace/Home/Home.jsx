// HOOKS
import { useContext } from "react";
// COMPONENTS
import Contacts from "./Contacts/Contacts";
import User from "./User/User";
import HeaderWithLogo from "../../HeaderWithLogo";
// CONTEXT 
import globalContext from '../../../contexts/GlobalContext';

const Home = () => {

  const { showMenu } = useContext(globalContext);

  return (
    <div className={`home ${showMenu ? "" : "hide"}`}>
      <HeaderWithLogo />
      <User />
      <Contacts />
    </div>
  );
};

export default Home;