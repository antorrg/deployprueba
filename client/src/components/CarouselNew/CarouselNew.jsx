import React, { useEffect, useRef, useCallback } from "react";
import styles from './CarouselNew.module.css'

const Carousel = React.memo(({ images, intervalTime = 2000, transitionDuration = 1 }) => {
  const carouselRef = useRef(null);

  const intervalFunction = useCallback(() => {
    // Clonar la primera imagen y añadirla al final del carrusel
    const firstImage = carouselRef.current.firstElementChild;
    const clonedImage = firstImage.cloneNode(true);
    carouselRef.current.appendChild(clonedImage);

    // Realizar la transición suave para desplazar hacia la nueva imagen
    carouselRef.current.style.transition = `transform ${transitionDuration}s ease-out`;

    // Desplazar el carrusel hacia la siguiente imagen
    carouselRef.current.style.transform = `translateX(-${100 / images.length}%)`;

    // Esperar a que termine la transición antes de restaurar el estado original
    setTimeout(() => {
      carouselRef.current.style.transition = "none";
      carouselRef.current.style.transform = "translateX(0)";
      carouselRef.current.removeChild(firstImage);
    }, transitionDuration * 1000);
  }, [images.length, transitionDuration]);

  useEffect(() => {
    const interval = setInterval(intervalFunction, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, intervalFunction]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper} ref={carouselRef}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={styles.image}
          />
        ))}
      </div>
    </div>
  )
});

export default Carousel;
