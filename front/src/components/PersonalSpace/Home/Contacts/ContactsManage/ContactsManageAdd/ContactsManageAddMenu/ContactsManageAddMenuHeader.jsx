// ICONS
import addIcon from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-hq.png";
// COMPONENTS
import CloseWindow from '../../../../../../../icons/closeWindow';

const ContactsManageAddMenuHeader = ({ handleAbort }) => (
  <header className="add-contact-menu__header">
    <img src={addIcon} className="add-contact-menu__header--logo" />
    <h2>Windows Live Contacts - Ajouter un contact</h2>
    <button
      type="button"
      className="close-button"
      onClick={handleAbort}>
      <CloseWindow />
    </button>
  </header>
);

export default ContactsManageAddMenuHeader;