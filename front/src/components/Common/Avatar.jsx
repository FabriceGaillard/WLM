const Avatar = ({ src }) => {
  return (
    <div className="avatar__container">
      <img
        src={src}
        alt="Avatar de l'utilisateur"
        className="avatar"
      />
    </div>
  );
};

export default Avatar;