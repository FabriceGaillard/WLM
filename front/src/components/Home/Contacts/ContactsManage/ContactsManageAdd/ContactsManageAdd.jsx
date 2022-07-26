// HOOKS
import { useState } from 'react';
// ICONS
import addIcon from "/assets/icons/contactsManageIcons/contacts-manage-add-icon.png";
import addIconHover from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-hover.png";

const ContactsManageAdd = () => {

  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    console.log("🚀 ~ file: ContactsManageAdd.jsx ~ line 9 ~ handleAdd");
  };

  const handleAbort = () => setIsAdding(false);


  return (
    <>
      <button
        type="button"
        className="add-contact__button"
        title="Ajouter un contact"
        onClick={() => setIsAdding(true)}
      >
        <div className="add-contact__button__img--container">
          <img src={addIcon} className="notHover" alt="Icône d'ajout de contact" />
          <img src={addIconHover} className="hover" alt="Icône d'ajout de contact au survol" />
        </div>
      </button>
      {isAdding && (
        <div className="add-contact-menu__container">
          <section className="add-contact-menu">
            <header className="add-contact-menu__header">
              <img src={addIconHover} className="add-contact-menu__logo" />
              <h2>Windows Live Contacts - Ajouter un contact</h2>
              <button
                type="button"
                className="add-contact-menu__close-button"
                onClick={handleAbort}>
                annuler
              </button>
            </header>
            <form onSubmit={handleAdd}>
              <label htmlFor="add-contact-email">Adresse de messagerie instantanée</label>
              <input type="text" />
              <div className="submit-abort">
                <input type="submit" value="Ajouter un contact" />
                <button type="button" onClick={handleAbort}>Annuler</button>
              </div>
            </form>
          </section>
        </div>

      )}

    </>
  );
};

export default ContactsManageAdd;