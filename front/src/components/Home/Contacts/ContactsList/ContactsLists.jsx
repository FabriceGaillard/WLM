// HOOKS
import { useEffect, useState } from 'react';
// FETCH
import { fetchContacts } from '../../../../helpers/fetch';
// COMPONENTS
import { ContactsListCard, ContactsListsEmpty, ContactsListsButton } from '../contactsIndex';

const ContactsLists = () => {

  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [contactsContextMenu, setContactsContextMenu] = useState({});

  useEffect(() => {
    const getContacts = async () => {
      const userContacts = await fetchContacts();
      const userContactsReduce = userContacts.reduce((acc, { id }) => {
        acc[id] = false;
        return acc;
      }, { current: null });

      setContacts(userContacts);
      setContactsContextMenu(userContactsReduce);
    };

    getContacts();
  }, []);

  return (
    <div className="contacts-list__container">
      {contacts.length !== 0
        ? (
          <ul className="contacts-list">
            <ContactsListsButton data={{ showContacts, setShowContacts, contacts }} />
            {showContacts && (
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