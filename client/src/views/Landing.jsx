import Carousel from "../components/carousel/Carousel";
import Navbar from "../components/navbar/Navbar";
import mocks from "../assets/mocks";
import { useEffect } from "react";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import style from './styles/Landing.module.css'
import { ButtonBack, Consejos, Contacto, Footer, Historia, Pagina, Servicios } from './FrontPage/Index'

const Landing = () => {
  useEffect(() => {
    // Actualiza scrollSpy cuando el componente se monta
    scrollSpy.update();

  }, []);


  return (
    <div className={style.bigDiv}>
      <Element name='pagina'><Pagina /></Element>
      <Element name='historia'><Historia /></Element>
      <Element name='servicios'><Servicios /></Element>
      <Element name='consejos'><Consejos /></Element>
      <Element name='contacto'><Contacto /></Element>

      <ButtonBack />

      {/* <Carousel info={mocks}/> */}
    </div>
  );
};

export default Landing;
