// ICONS
import addIcon from "/assets/icons/contactsManageIcons/contacts-manage-add-icon.png";
import addIconHover from "/assets/icons/contactsManageIcons/contacts-manage-add-icon-hover.png";

const ContactsManageAdd = () => {
  const handleAdd = () => {
    console.log("🚀 ~ file: ContactsManageAdd.jsx ~ line 9 ~ handleAdd");
  };

  return (
    <button
      type="button"
      className="add-contact__button"
      title="Ajouter un contact"
      onClick={handleAdd}
    >
      <div className="add-contact__button__img--container">
        <img src={addIcon} className="notHover" alt="Icône d'ajout de contact" />
        <img src={addIconHover} className="hover" alt="Icône d'ajout de contact au survol" />
      </div>
    </button>
  );
};

export default ContactsManageAdd;