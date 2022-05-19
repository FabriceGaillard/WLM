import { useEffect } from 'react';

const clickOutside = (listRef, callback, listBtnTarget) => {

  const handleClickOustsideList = ({ target }) => {
    if (
      listRef.current &&
      listRef.current.contains(target) === false &&
      target !== listBtnTarget
    )
      callback(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOustsideList);

    return () => {
      document.removeEventListener('click', handleClickOustsideList);
    };
  });

};

export default clickOutside;