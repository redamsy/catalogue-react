import React, { useState, useContext, memo, useMemo } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';
import AddItemNotificationContext from '../../providers/AddItemNotificationProvider';
import styles from './QuickView.module.css';
import { extractImageSrcFromUrl, generateSizesAndColors } from '../../utils';
import { DetailedProduct } from '../../models/Product';
import { Size } from '../../models/Size';
import { Color } from '../../models/Color';

var NotFoundImage = require('../../static/not-found.png');

interface Props {
  detailedProduct: DetailedProduct;
  close: () => void;
  buttonTitle?: string;
}
const QuickView = memo((props: Props) => {
  const { detailedProduct, close, buttonTitle = 'Add to Bag' } = props;

  const { sizes: sizeOptions, colors: colorOptions  } = useMemo(() => {
    const { sizes, colors } = generateSizesAndColors([detailedProduct]);
    return { sizes: sizes, colors  }
  }, [detailedProduct]);

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const [activeSwatch, setActiveSwatch] = useState<Color | undefined>(undefined);
  const [activeSize, setActiveSize] = useState<Size | undefined>(undefined);

  const handleAddToBag = () => {
    close();
    showNotification();
  };

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Select Options</h4>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <span className={styles.productName}>{detailedProduct.title}</span>
          <div className={styles.price}>
            <CurrencyFormatter amount={detailedProduct.price}></CurrencyFormatter>
          </div>
          <div className={styles.productImageContainer}>
            <img alt={detailedProduct.title} src={extractImageSrcFromUrl(detailedProduct.image.url) || NotFoundImage}></img>
          </div>
        </div>

        {colorOptions ? (
          <div className={styles.sectionContainer}>
            <SwatchList
              swatchList={colorOptions}
              activeSwatch={activeSwatch}
              setActiveSwatch={setActiveSwatch}
            />
          </div>
        ) : <></>}

        {colorOptions ? (
          <div className={styles.sectionContainer}>
            <SizeList
              sizeList={sizeOptions}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
            />
          </div>
        ) : <></>}

        <Button onClick={handleAddToBag} fullWidth level={'primary'}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
});

export default QuickView;