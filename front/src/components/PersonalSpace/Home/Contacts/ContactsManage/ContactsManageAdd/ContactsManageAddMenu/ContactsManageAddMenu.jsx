// HOOKS
import { useState } from 'react';
// COMPONENTS
import { ContactsManageAddMenuHeader, ContactsManageAddMenuForm } from "../../../contactsIndex";

const ContactsManageAddMenu = ({ setIsAdding }) => {

  const handleAbort = () => setIsAdding(false);

  return (
    <div className="add-contact-menu__container">
      <section className="add-contact-menu">
        <ContactsManageAddMenuHeader handleAbort={handleAbort} />
        <ContactsManageAddMenuForm handleAbort={handleAbort} />
      </section>
    </div>
  );
};

export default ContactsManageAddMenu;