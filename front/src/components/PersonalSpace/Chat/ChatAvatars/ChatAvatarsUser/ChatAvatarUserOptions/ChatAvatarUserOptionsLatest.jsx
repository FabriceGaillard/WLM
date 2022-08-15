// DATA
import defaultAvatarBase64 from "../../../../../../data/defaultAvatarBase64";

const ChatAvatarUserOptionsLatestAvatars = () => {
  return (
    <li className="options-list-user latest-avatars">
      Dernières images perso utilisées
      <ul className="avatars__container">
        {Array(8).fill(null).map((_, idx) => {
          return (
            <li key={idx} className="avatars__container--img">
              <img src={defaultAvatarBase64} />
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default ChatAvatarUserOptionsLatestAvatars;