import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './Carousel.module.css';
//import { PrevArrow, NextArrow } from './Arrows';

//* Carousel.js
const Carousel = ( {info}) => {
  //console.log(info)
  //* Configuración del carrusel
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1, // Ajusta según tus necesidades
    slidesToScroll: 1,
    autoplay: true, // Habilita el autoplay
    autoplaySpeed: 2000, // Establece el tiempo de espera entre diapositivas en milisegundos (en este caso, 2 segundos)
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768, // Ajusta el breakpoint según tus necesidades
        settings: {
          slidesToShow: 1, // Cambia el número de tarjetas para dispositivos móviles
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  
  };

  return (
    <Slider {...settings}>
      {info.map((inf) => (
        <img key={inf.id} src={inf.url} className={style.image} />
      ))}
    </Slider>
  );
};

export default Carousel;

//style={{maxWidth: '12.5rem', zIndex: "2"}}