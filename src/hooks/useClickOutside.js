import { useEffect } from "react";

export const useClickOutside = (func, ref) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      func();
    }
  };
};
