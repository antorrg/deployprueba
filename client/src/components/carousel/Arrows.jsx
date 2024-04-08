import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Puedes cambiar las flechas según tus preferencias
import styles from './Arrows.module.css'

const PrevArrow = ({ onClick }) => (
  <div className={styles.arrowPrev} onClick={onClick}>
    <FaArrowLeft />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className={styles.arrowNext} onClick={onClick}>
    <FaArrowRight />
  </div>
);

export { PrevArrow, NextArrow };
