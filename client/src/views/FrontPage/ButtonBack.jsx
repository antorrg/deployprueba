import React, { useState, useEffect } from "react";

import { Link, animateScroll as scroll } from "react-scroll";

import { ChevronUpIcon } from "@heroicons/react/outline";

const ButtonBack = () => {                   
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 300 ? setShow(true) : setShow(false);
    });
  });
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    show && (
      <button
        onClick={() => scrollToTop()}
        style={{padding:'0',backgroundColor:'grey', width:'50px', height:'50px', alignItems:'center',borderRadius:'2rem', zIndex:'1000', bottom:'0', position:'fixed'}}
      >
      <ChevronUpIcon style={{ width:'50px', borderRadius:'2rem'}} />
      </button>
    )
  );
};

export default ButtonBack;
