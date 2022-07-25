// COMPONENTS
import { useState, useRef } from 'react';

const ContactsManageSearch = () => {

  const inputRef = useRef(null);

  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchInput = ({ target }) => {
    setSearchInputValue(target.value);
    console.log("🚀 ~ file: ContactsManageSearch.jsx ~ line 7 ~ handleSearchInput", target.value);
  };

  const handleResetInput = () => {
    setSearchInputValue("");
    inputRef.current.focus();
  };

  return (
    <div className="contacts-manage-search__container">
      <input
        type="text"
        placeholder="Rechercher un contact ou un numéro..."
        onChange={handleSearchInput}
        value={searchInputValue}
        ref={inputRef}
      />
      <button type="button"
        className="reset-input__button"
        onClick={handleResetInput}
      >
        <div className="reset-input__button__img--container">
          <img src="/assets/icons/contactsManageIcons/contacts-manage-search-reset.png" className="notHover" />
          <img src="/assets/icons/contactsManageIcons/contacts-manage-search-reset-hover.png" className="hover" />
        </div>
      </button>
    </div>
  );
};

export default ContactsManageSearch;