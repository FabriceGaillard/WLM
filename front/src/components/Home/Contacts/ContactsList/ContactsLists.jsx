// HOOKS
import { useEffect, useState } from 'react';
// FETCH
import { fetchContacts } from '../../../../helpers/fetch';
// COMPONENTS
import { ContactsListCard } from '../contactsIndex';
// ICONS
import DropDownContactsList from '../../../../icons/DropDownContactsList';

const ContactsLists = () => {

  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      const userContacts = await fetchContacts();
      console.log(userContacts);
      setContacts(userContacts);
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
              contacts.map(({ relatedUser }) => (
                <ContactsListCard key={relatedUser.id} relatedUser={relatedUser} />
              ))
            )}
          </ul>
        )
        : <p>Aucun contacts lol</p>
      }
    </div>
  );
};

export default ContactsLists;