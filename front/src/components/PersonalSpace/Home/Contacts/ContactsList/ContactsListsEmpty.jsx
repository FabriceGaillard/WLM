// ICONS
import addIcon from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-hq.png";

const ContactsListsEmpty = () => (
  <div className="contacts-list__empty">
    <img src={addIcon} />
    <p>Votre liste de contacts est vide. Cliquez sur l'icône ci-dessus pour ajouter des contacts.</p>
  </div>
);

export default ContactsListsEmpty;