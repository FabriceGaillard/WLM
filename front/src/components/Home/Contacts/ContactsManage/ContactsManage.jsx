// COMPONENTS
import { ContactsManageAdd, ContactsManageSortShow, ContactsManageSearch } from "../contactsIndex";
// ICONS
import contactsManageIcon from "/assets/icons/contactsManageIcons/contacts-manage-icon.png";

const ContactsManage = () => {
  return (
    <div className="contacts-manage__container">
      <img className="contacts-manage__icon" src={contactsManageIcon} />
      <ContactsManageSearch />
      <ContactsManageAdd />
      <ContactsManageSortShow />
    </div>
  );
};

export default ContactsManage;