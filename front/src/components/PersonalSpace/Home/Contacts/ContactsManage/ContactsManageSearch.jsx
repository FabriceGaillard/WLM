// COMPONENTS
import { useState, useRef, useContext, useEffect } from 'react';
// ICONS
import resetInputIcon from "/assets/icons/contactsManageIcons/contacts-manage-search-reset.png";
import resetInputIconHover from "/assets/icons/contactsManageIcons/contacts-manage-search-reset-hover.png";
// CONTEXT
import globalContext from '../../../../../contexts/GlobalContext';
import PersonalSpaceContext from '../../../../../contexts/PersonalSpaceContext';

const ContactsManageSearch = () => {

  const { contacts, setContacts } = useContext(globalContext);
  const { setEmptySearchResult } = useContext(PersonalSpaceContext);
  const inputRef = useRef(null);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [contactsCopy, setContactsCopy] = useState([]);

  const handleSearchInput = ({ target }) => {
    const inputValue = target.value;
    setSearchInputValue(inputValue);

    const filterContacts = contactsCopy.filter(({ relatedUser }) => {
      const { email, username, personalMessage } = relatedUser;

      return (
        email.includes(inputValue) ||
        username.includes(inputValue) ||
        personalMessage.includes(inputValue)
      );
    });

    filterContacts.length === 0
      ? setEmptySearchResult(true)
      : setEmptySearchResult(false);

    setContacts(filterContacts);
  };

  const handleResetInput = () => {
    setSearchInputValue("");
    inputRef.current.focus();
  };

  useEffect(() => {
    setContactsCopy(contacts);
  }, []);

  return (
    <div className="contacts-manage-search__container">
      <input
        type="text"
        placeholder="Rechercher un contact..."
        title="Retrouvez un contact en entrant un nom."
        onChange={handleSearchInput}
        value={searchInputValue}
        ref={inputRef}
      />
      <button type="button"
        className="reset-input__button"
        onClick={handleResetInput}
      >
        <div className="reset-input__button__img--container">
          <img src={resetInputIcon} className="notHover" alt="Icône de reset" />
          <img src={resetInputIconHover} className="hover" alt="Icône de reset en mode survol" />
        </div>
      </button>
    </div>
  );
};

export default ContactsManageSearch;