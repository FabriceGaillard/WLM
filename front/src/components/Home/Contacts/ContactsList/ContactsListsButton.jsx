// ICONS
import DropDownContactsList from '../../../../icons/DropDownContactsList';

const ContactsListsButton = ({ data }) => {

  const { showContacts, setShowContacts, contacts } = data;

  return (
    <button type="button"
      onClick={() => setShowContacts(prev => !prev)}
      className="show-contacts__button"
    >
      <DropDownContactsList className={showContacts ? "arrowRight" : ""} />
      <h3>Contacts ({contacts.length})</h3>
    </button>
  );
};

export default ContactsListsButton;