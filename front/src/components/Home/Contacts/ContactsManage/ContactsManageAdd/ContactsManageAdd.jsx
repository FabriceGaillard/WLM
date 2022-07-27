// HOOKS
import { useState, useEffect } from 'react';
// ICONS
import addIcon from "/assets/icons/contactsManageIcons/contacts-manage-add-icon.png";
import addIconHover from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-hover.png";
import addIconV2 from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-v2.png";
import closeIcon from "/assets/icons/close-icon.png";
import closeIconHover from "/assets/icons/close-icon-hover.png";


const ContactsManageAdd = () => {

  const [isAdding, setIsAdding] = useState(false);
  const [emailInput, setEmailInput] = useState("");

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
              <img src={addIconV2} className="add-contact-menu__logo" />
              <h2>Windows Live Contacts - Ajouter un contact</h2>
              <button
                type="button"
                className="close-button"
                onClick={handleAbort}>
                <div className="close-button__img--container">
                  <img src={closeIconHover} className="hover" alt="Icône de fermeture au survol" />
                  <img src={closeIcon} className="notHover" alt="Icône de fermeture" />
                </div>
              </button>
            </header>
            <form onSubmit={handleAdd}>
              <label htmlFor="add-contact-email">Adresse de messagerie instantanée :</label>
              <input type="email" required onChange={({ target }) => setEmailInput(target.value)} />
              <div className="add-abort">
                <button
                  type="submit"
                  className={emailInput ? "" : "disabled-email"}
                  disabled={emailInput ? false : true}
                >
                  Ajouter un contact
                </button>
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