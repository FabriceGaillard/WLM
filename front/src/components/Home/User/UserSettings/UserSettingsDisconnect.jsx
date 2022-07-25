// DATA
import statusList from '../../../../data/login/statusList';

const UserSettingsDisconnect = (props) => {

  const { setShowSettings } = props;

  const handleDisconnect = () => {
    console.log("disconnect");
    setShowSettings(false);
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