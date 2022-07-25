// COMPONENTS
import React from 'react';

const ContactsManageSearch = () => {

  const handleSearchInput = ({ target }) => {
    console.log("🚀 ~ file: ContactsManageSearch.jsx ~ line 7 ~ handleSearchInput", target.value);
  };

  return (
    <div className="contacts-manage-search__container">
      <input
        type="text"
        placeholder="Rechercher un contact ou un numéro..."
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default ContactsManageSearch;