import React, { useEffect, useRef } from "react";
import { AiOutlineUp } from "react-icons/ai";
import handleScrollTop from "../../hooks/handleScrollTop";

const ButtonOnTop = () => {
  const btnScroll = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (btnScroll.current) {
        if (window.scrollY >= 200) {
          btnScroll.current.classList.add("show");
        } else {
          for (
            let index = 0;
            index < btnScroll.current.classList.length;
            index++
          ) {
            if (btnScroll.current.classList[index] === "show") {
              btnScroll.current.classList.remove("show");
            }
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="scroll__top hide hide__left"
      ref={btnScroll}
      onClick={handleScrollTop}
    >
      <AiOutlineUp />
    </div>
  );
};

export default ButtonOnTop;
