import React, { useState, memo } from 'react';
import styles from './ProductCard.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import CurrencyFormatter from '../CurrencyFormatter';
import { useNavigate } from 'react-router-dom';
import { extractImageSrcFromUrl } from '../../utils';

var NotFoundImage = require('../../static/not-found.png');

interface Props {
  id: string;
  itemCode: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  showQuickView: () => void;
  height?: number | string;
}
const ProductCard = memo((props: Props) => {
  const navigate = useNavigate();
  const [isWishlist, setIsWishlist] = useState(false);
  const {
    id,
    itemCode,
    image,
    title,
    price,
    originalPrice,
    showQuickView,
    height = 580,
  } = props;

  const handleRouteToProduct = () => {
    navigate(`/product/${itemCode}`);
  };

  const handleQuickView = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    showQuickView();
  };

  const handleFavorite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        onClick={() => handleRouteToProduct()}
        role={'presentation'}
      >
        <img style={{ height: `${height}px` }} src={extractImageSrcFromUrl(image) || NotFoundImage} alt={title}></img>
        <div
          className={styles.bagContainer}
          role={'presentation'}
          onClick={(e) => handleQuickView(e)}
        >
          <EnhancedEncryptionOutlinedIcon />
        </div>
        <div
          className={styles.heartContainer}
          role={'presentation'}
          onClick={(e) => handleFavorite(e)}
        >
          <FavoriteBorderIcon />
          <div
            className={`${styles.heartFillContainer} ${
              isWishlist === true ? styles.show : styles.hide
            }`}
          >
            <FavoriteIcon/>
          </div>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.productName}>{title}</span>
        <div className={styles.prices}>
          <span
            className={`${originalPrice !== undefined ? styles.salePrice : ''}`}
          >
            <CurrencyFormatter amount={price}></CurrencyFormatter>
          </span>
          {originalPrice && (
            <span className={styles.originalPrice}>
              <CurrencyFormatter amount={originalPrice}></CurrencyFormatter>
            </span>
          )}
        </div>
        {/* TODO: take it fro gallery: this feature shows a greyed text ex: product.meta='+2 colors'  */}
        {/* <span className={styles.meta}>{meta}</span> */}
      </div>
    </div>
  );
});

export default ProductCard;