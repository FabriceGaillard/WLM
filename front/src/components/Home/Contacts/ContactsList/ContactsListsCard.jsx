// DATA
import statusList from '../../../../data/login/statusList';

const ContactsListsCard = ({ relatedUser }) => {

  const handleContact = () => {
    console.log("double click");
  };

  const { email, avatar, username, personalMessage } = relatedUser;
  return (
    <li className="user__card">
      <button onDoubleClick={handleContact}>
        <img src={statusList.appearOffline.icon} />
        <p className="user__card--name">{username}</p>
        {personalMessage && (
          <p className="user__card--personal">
            <span className="dash">-</span>
            {personalMessage}
          </p>)}
      </button>
    </li>
  );
};

export default ContactsListsCard;