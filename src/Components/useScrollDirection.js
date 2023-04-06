import { useState, useEffect } from "react";

function useScrollDirection() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect().top
  );
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;

      if (currentScrollTop < lastScrollTop - 1) {

        setScrollDirection("up");
      } else if (currentScrollTop > lastScrollTop + 1) {

        setScrollDirection("down");
      }

      setLastScrollTop(currentScrollTop);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, scrollDirection]);

  return scrollDirection;
}
export default useScrollDirection;
