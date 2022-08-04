// ICONS
import closeIcon from "/assets/icons/close-icon.png";
import closeIconHover from "/assets/icons/close-icon-hover.png";
import addIcon from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-hq.png";

const ContactsManageAddMenuHeader = ({ handleAbort }) => (
  <header className="add-contact-menu__header">
    <img src={addIcon} className="add-contact-menu__header--logo" />
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

export default ContactsManageAddMenuHeader;