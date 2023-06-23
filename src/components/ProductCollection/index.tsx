import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCollection.module.css';

interface Props {
    image: string;
    title: string;
    text: string;
    link: string;
}
const ProductCollection = memo((props: Props) => {
    const navigate = useNavigate();
  const { image, title, text, link } = props;

  return (
    <div
      role={'presentation'}
      onClick={() => navigate(link)}
      className={styles.root}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.text}>{text}</span>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
});

export default ProductCollection;