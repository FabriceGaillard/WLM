const AvatarBig = ({ src }) => {
  return (
    <div className="avatar__big">
      <img
        src={src}
        alt="Avatar de l'utilisateur"
        className="avatar"
      />
    </div>
  );
};

export default AvatarBig;