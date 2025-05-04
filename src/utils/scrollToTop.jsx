import React from 'react';

const useScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  });
};

export default useScrollToTop;
