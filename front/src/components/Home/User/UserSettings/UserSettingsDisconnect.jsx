// HOOKS
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// DATA
import statusList from '../../../../data/login/statusList';
// CONTEXT 
import globalContext from '../../../../contexts/GlobalContext';
// HELPERS
import { fetchLogout } from '../../../../helpers/fetchMethods/home';
import { getLocalStorageUsers, removeStorageCurrent } from '../../../../helpers/handleStorage';

const UserSettingsDisconnect = (props) => {

  const { setShowSettings } = props;

  const { setUserDataFromDb } = useContext(globalContext);

  const navigate = useNavigate();

  const handleDisconnect = async () => {
    setShowSettings(false);

    try {
      await fetchLogout();
      const users = getLocalStorageUsers();
      removeStorageCurrent(users);
      setUserDataFromDb(null);
      navigate("/login");
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <li onClick={handleDisconnect}>
      <div className="status-img__container" data-setting="disconnect">
        <img className="notHover" src={statusList.appearOffline.icon} alt="Icône représentant le status hors ligne" />
        <img className="hover" src={statusList.appearOffline.inconHover} alt="Icône représentant le status hors ligne au survol" />
      </div>
      <span>Se déconnecter</span>
    </li>
  );
};

export default UserSettingsDisconnect;