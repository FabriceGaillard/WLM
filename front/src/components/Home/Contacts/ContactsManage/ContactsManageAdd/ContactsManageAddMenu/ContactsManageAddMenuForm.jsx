// HOOKS
import { useState } from 'react';

const ContactsManageAddMenuForm = ({ handleAbort }) => {

  const [emailInput, setEmailInput] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    console.log("🚀 ~ file: ContactsManageAdd.jsx ~ line 9 ~ handleAdd");
  };

  return (
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
  );
};

export default ContactsManageAddMenuForm;