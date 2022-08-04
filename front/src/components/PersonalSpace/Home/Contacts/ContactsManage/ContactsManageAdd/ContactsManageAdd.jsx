// HOOKS
import { useState } from 'react';
// COMPONENTS
import { ContactsManageAddMenu, ContactsManageAddButton } from "../../contactsIndex";

const ContactsManageAdd = () => {

  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <ContactsManageAddButton setIsAdding={setIsAdding} />
      {isAdding && <ContactsManageAddMenu setIsAdding={setIsAdding} />}
    </>
  );
};

export default ContactsManageAdd;