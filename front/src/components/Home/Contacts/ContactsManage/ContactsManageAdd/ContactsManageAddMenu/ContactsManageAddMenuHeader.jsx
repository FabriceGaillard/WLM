// ICONS
import closeIcon from "/assets/icons/close-icon.png";
import closeIconHover from "/assets/icons/close-icon-hover.png";
import addIconV2 from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-v2.png";

const ContactsManageAddMenuHeader = (props) => {

  const { handleAbort } = props;

  return (
    <header className="add-contact-menu__header">
      <img src={addIconV2} className="add-contact-menu__logo" />
      <h2>Windows Live Contacts - Ajouter un contact</h2>
      <button
        type="button"
        className="close-button"
        onClick={handleAbort}>
        <div className="close-button__img--container">
          <img src={closeIconHover} className="hover" alt="Icône de fermeture au survol" />
          <img src={closeIcon} className="notHover" alt="Icône de fermeture" />
        </div>
      </button>
    </header>
  );
};

export default ContactsManageAddMenuHeader;