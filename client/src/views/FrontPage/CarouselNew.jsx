import style from "./styles/CarouselNew.module.css";
import React from "react";

//este subComponente se muestra mientras se cargan las imágenes
function LoadingCarousel() {
  return (
    <div>
      <span>Haciendo la magia...</span>
    </div>
  );
}

//este subComponente es el que se mapea con las imágenes
function DivImg({ img, index }) {
  return (
    <div key={index} className={style.slide}>
      <img src={img} className={style.img} alt={`img${index}`} />
    </div>
  );
}

function CarouselNew({ images }) {
  const newImages = [...images, ...images];
  const widthSlideTrack = 250 * newImages.length;

  return (
    <div>
      <div className={style.isBody}>
        <div className={style.slider}>
          <div
            className={style.slidetrack}
            style={{ width: `${widthSlideTrack}px` }}
          >
            {newImages ? (
              newImages.map((image, index) => (
                <DivImg key={index} img={image} index={index} />
              ))
            ) : (
              <LoadingCarousel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselNew;
