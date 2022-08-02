// HOOKS
import { useEffect, useState, useContext } from 'react';
// FETCH
import { fetchContacts } from '../../../../helpers/fetch';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';
// COMPONENTS
import {
  ContactsListCard,
  ContactsListsEmpty,
  ContactsListsButton
} from '../contactsIndex';

const ContactsLists = () => {

  const { contacts } = useContext(globalContext);
  const [showContacts, setShowContacts] = useState(true);
  const [contactsContextMenu, setContactsContextMenu] = useState(null);

  useEffect(() => {
    const userContactsReduce = contacts.reduce((acc, { id }) => {
      acc[id] = false;
      return acc;
    }, { current: null });

    setContactsContextMenu(userContactsReduce);
  }, [contacts]);

  return (
    <div className="contacts-list__container">
      {contacts.length !== 0
        ? (
          <ul className="contacts-list">
            <ContactsListsButton data={{ showContacts, setShowContacts, contacts }} />
            {(showContacts && contactsContextMenu) && (
              contacts.map(({ relatedUser, id }) => (
                <ContactsListCard
                  key={id}
                  data={{ relatedUser, setContactsContextMenu, contactsContextMenu, id }}
                />
              ))
            )}
          </ul>
        )
        : <ContactsListsEmpty />
      }
    </div>
  );
};

export default ContactsLists;