// COMPONENTS
import { useState, useRef } from 'react';
// ICONS
import resetInputIcon from "/assets/icons/contactsManageIcons/contacts-manage-search-reset.png";
import resetInputIconHover from "/assets/icons/contactsManageIcons/contacts-manage-search-reset-hover.png";

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
          <img src={resetInputIcon} className="notHover" />
          <img src={resetInputIconHover} className="hover" />
        </div>
      </button>
    </div>
  );
};

export default ContactsManageSearch;