// COMPONENTS
import React from 'react';

const ContactsManageSort = () => {

  const handleSort = () => {
    console.log("🚀 ~ file: ContactsManageSort.jsx ~ line 7 ~ handleSort");
  };

  return (
    <button
      type="button"
      className="sort-contact__button"
      onClick={handleSort}
    >
      <div className="sort-contact__button__img--container">
        <img src="/assets/icons/contactsManageIcons/contacts-manage-sort-icon.png" className="notHover" alt="" />
        <img src="/assets/icons/contactsManageIcons/contacts-manage-sort-icon-hover.png" className="hover" alt="" />
      </div>
    </button>
  );
};

export default ContactsManageSort;