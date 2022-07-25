import loader from "/assets/loading_anim.gif";

const Loader = () => {
  return (
    <div className="connecting-gif-protected__container">
      <img
        className="connecting-gif-protected__img"
        src={loader}
        alt="connecting gif animation"
      />
      <p className="connecting-gif-protected__text">Chargement...</p>
    </div>

  );
};

export default Loader;