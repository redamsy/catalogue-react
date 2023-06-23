import React, { useContext, memo } from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AddItemNotificationContext from '../../providers/AddItemNotificationProvider';

import Button from '../Button';

import styles from './AddNotification.module.css';
import { Link } from 'react-router-dom';

var sweaterImage = require('../../static/pdp1.jpeg');

const AddNotification = memo((props : { openCart: () => void }) => {
  const sampleCartItem = {
    image: sweaterImage,
    alt: '',
    name: 'Lambswool Crew Neck Jumper',
    price: 220,
    color: 'Anthracite Melange',
    size: 'XS',
  };

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotif = ctxAddItemNotification.state?.open;

  return (
    <div
      className={`${styles.root} ${
        showNotif === true ? styles.show : styles.hide
      }`}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <CheckCircleOutlineOutlinedIcon/>
        </div>
        <span>Item added to bag</span>
      </div>

      <div className={styles.newItemContainer}>
        <div className={styles.imageContainer}>
          <img alt={sampleCartItem.alt} src={sampleCartItem.image} />
        </div>
        <div className={styles.detailContainer}>
          <span className={styles.name}>{sampleCartItem.name}</span>
          <span className={styles.meta}>Color: {sampleCartItem.color}</span>
          <span className={styles.meta}>Size: {sampleCartItem.size}</span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button onClick={props.openCart} level={'secondary'}>
          view my bag (1)
        </Button>
        <Button level="primary" href="/cart">
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>continue shopping</Link>
        </div>
      </div>
    </div>
  );
});

export default AddNotification;