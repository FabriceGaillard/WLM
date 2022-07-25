// COMPONENTS
import { ContactsManageAdd, ContactsManageSort, ContactsManageSearch } from "../contactsIndex";

const ContactsManage = () => {
  return (
    <div className="contacts-manage__container">
      <img className="contacts-manage__icon" src="/assets/icons/contactsManageIcons/contacts-manage-icon.png" />
      <ContactsManageSearch />
      <ContactsManageAdd />
      <ContactsManageSort />
    </div>
  );
};

export default ContactsManage;