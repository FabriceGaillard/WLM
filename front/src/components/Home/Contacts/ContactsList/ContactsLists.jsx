// HOOKS
import { useEffect, useState } from 'react';
// FETCH
import { fetchContacts } from '../../../../helpers/fetch';
// COMPONENTS
import { ContactsListCard, ContactsListsEmpty } from '../contactsIndex';
// ICONS
import DropDownContactsList from '../../../../icons/DropDownContactsList';

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
            <button type="button"
              onClick={() => setShowContacts(prev => !prev)}
              className="show-contacts__button"
            >
              <DropDownContactsList className={showContacts ? "arrowRight" : ""} />
              <h3>Contacts ({contacts.length})</h3>
            </button>

            {showContacts && (
              contacts.map(({ relatedUser, id }) => (
                <ContactsListCard
                  key={id}
                  relatedUser={relatedUser}
                  setContactsContextMenu={setContactsContextMenu}
                  contactsContextMenu={contactsContextMenu}
                  id={id}
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