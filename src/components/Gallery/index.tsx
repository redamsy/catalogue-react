import React, { memo } from 'react';

import Slider from '../Slider';

import styles from './Gallery.module.css';
import { Gallery } from '../../models/Product';
import { extractImageSrcFromUrl } from '../../utils';

var NotFoundImage = require('../../static/not-found.png');

interface Props {
  images: Gallery[];
}
const GalleryGrid = memo((props: Props) => {
  const { images } = props;

  const customSliderSettings = {
    slidesToShow: 1,
  };

  const renderImages = () => {
    return images.map((imageObject, index) => {
      return (
        <div key={index} className={styles.imageContainer}>
          <img alt="" src={extractImageSrcFromUrl(imageObject.image.url) || NotFoundImage} />
        </div>
      );
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.cardGrid}>
        {images.map((imageObject, index) => {
          return (
            <div key={index} className={styles.imageContainer}>
              <img alt="" src={extractImageSrcFromUrl(imageObject.image.url) || NotFoundImage} />
            </div>
          );
        })}
      </div>
      <div className={styles.mobileSlider}>
        <Slider settings={customSliderSettings}>
          {images.length > 0 && renderImages()}
        </Slider>
      </div>
    </div>
  );
});

export default GalleryGrid;