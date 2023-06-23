import React, { useState, useContext, memo, useMemo } from 'react';
import styles from './sample.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import BreadCrumbs from '../../components/BreadCrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import Split from '../../components/Split';
import SwatchList from '../../components/SwatchList';

import ProductCardGrid from '../../components/ProductCardGrid';

import AddItemNotificationContext from '../../providers/AddItemNotificationProvider';
import Layout from '../../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgressPage from '../../components/CircularProgressPage';
import { useProductState } from '../../context/productsContext';
import NotFoundComponent from '../../components/NotFoundComponent';
import { generateSizesAndColors } from '../../utils';
import { Size } from '../../models/Size';
import { Color } from '../../models/Color';

const ProductPage = memo(() => {
  let { itemcode } = useParams();
  const navigate = useNavigate();
  const { detailedProducts, loadingData } = useProductState();


  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  const [qty, setQty] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);

  const { sampleProduct, sizes: sizeOptions, colors: colorOptions  } = useMemo(() => {
    const currentProduct = detailedProducts.find((el) => el.itemCode === itemcode);
    const { sizes, colors } = currentProduct ? generateSizesAndColors([currentProduct]) : {colors: undefined, sizes: undefined};
    return { sampleProduct: currentProduct, sizes: sizes, colors  }
  }, [detailedProducts, itemcode]);

  const [activeSize, setActiveSize] = useState<Size | undefined>(undefined);
  const [activeSwatch, setActiveSwatch] = useState<Color | undefined>(undefined);

  return (
    <Layout>
      {loadingData ? (
        <CircularProgressPage />
      ) : !sampleProduct ? <NotFoundComponent/> : (
        <div className={styles.root}>
          <Container size={'large'} spacing={'min'}>
            <BreadCrumbs
              crumbs={[
                { link: '/', label: 'Home' },
                { label: 'Men', link: '/shop' },
                { label: 'Sweater', link: '/shop' },
                { label: `${sampleProduct.title}` },
              ]}
            />
            <div className={styles.content}>
              <div className={styles.gallery}>
                <Gallery images={sampleProduct.galleries} />
              </div>
              <div className={styles.details}>
                <h1>{sampleProduct.title}</h1>
                <span className={styles.vendor}> by {sampleProduct.vendor.name}</span>

                <div className={styles.priceContainer}>
                  <CurrencyFormatter appendZero amount={sampleProduct.price} />
                </div>

                {colorOptions ? (
                <div>
                  <SwatchList
                    swatchList={colorOptions}
                    activeSwatch={activeSwatch}
                    setActiveSwatch={setActiveSwatch}
                  />
                  </div>
                ) : <></>}
                {sizeOptions ? (
                  <div className={styles.sizeContainer}>
                    <SizeList
                      sizeList={sizeOptions}
                      activeSize={activeSize}
                      setActiveSize={setActiveSize}
                    />
                  </div>
                ) : <></>}

                <div className={styles.quantityContainer}>
                  <span>Quantity</span>
                  <AdjustItem qty={qty} setQty={setQty} />
                </div>

                <div className={styles.actionContainer}>
                  <div className={styles.addToButtonContainer}>
                    <Button
                      onClick={() => showNotification()}
                      fullWidth
                      level={'primary'}
                    >
                      Add to Bag
                    </Button>
                  </div>
                  <div
                    className={styles.wishlistActionContainer}
                    role={'presentation'}
                    onClick={() => setIsWishlist(!isWishlist)}
                  >
                    <FavoriteBorderIcon/>
                    <div
                      className={`${styles.heartFillContainer} ${
                        isWishlist === true ? styles.show : styles.hide
                      }`}
                    >
                      <FavoriteIcon/>
                    </div>
                  </div>
                </div>

                <div className={styles.description}>
                  <p>{sampleProduct.description}</p>
                  <span>Product code: {sampleProduct.itemCode}</span>
                </div>

                <div className={styles.informationContainer}>
                  <Accordion
                    type={'plus'}
                    customStyle={styles}
                    title={'composition & care'}
                  >
                    <p className={styles.information}>
                      {sampleProduct.description}
                    </p>
                  </Accordion>
                  <Accordion
                    type={'plus'}
                    customStyle={styles}
                    title={'delivery & returns'}
                  >
                    <p className={styles.information}>
                      {sampleProduct.description}
                    </p>
                  </Accordion>
                  <Accordion type={'plus'} customStyle={styles} title={'help'}>
                    <p className={styles.information}>
                      {sampleProduct.description}
                    </p>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className={styles.suggestionContainer}>
              <h2>You may also like</h2>
              <ProductCardGrid
                spacing
                showSlider
                height={400}
                columns={4}
                // TODO: should add few suggestion similar category/subcategory to current product
                data={detailedProducts}
              />
            </div>
          </Container>

          <div className={styles.attributeContainer}>
            <Split
              image={'/cloth.png'}
              alt={'attribute description'}
              title={'Sustainability'}
              description={
                'We design our products to look good and to be used on a daily basis. And our aim is to inspire people to live with few timeless objects made to last. This is why quality over quantity is a cornerstone of our ethos and we have no interest in trends or seasonal collections.'
              }
              ctaText={'learn more'}
              cta={() => navigate('/blog')}
              bgColor={'var(--standard-light-grey)'}
            />
          </div>
        </div>
      )}
    </Layout>
  );
});

export default ProductPage;