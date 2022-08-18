import { useState, useEffect } from "react";
function useWindowSize() {
  //get window dimention
  const [windowSize, detectHW] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowSize]);
  return windowSize;
}

export default useWindowSize;
