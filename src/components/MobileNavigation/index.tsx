import React, { useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import Config from '../../assets/config.json';

//TO DO: refactor this to handle multiple nested links to avoid hardcoding 'depth'
// have to restructure config.json
// refactor this

import styles from './MobileNavigation.module.css';
import { useAuthActions, useAuthState } from '../../context/authContext';
import { CategoriesWithSub } from '../../models/Product';
import { NavObject } from '../Header';

const MobileNavigation = memo((props: { categoriesWithSub: CategoriesWithSub[]; close: () => void }) => {
  const { signOut } = useAuthActions();

  // start of filter by url logic............
  //A URL pathname, beginning with a /.
  const { pathname } = useLocation();
  // if user is comming from ('shop'|| 'shop/...../ ) or ('shopvw'|| 'shopv2/...../ )
  let filterPathName = '/shop';

  //compare '/shopv2' first, since '/shopv2' and '/shop' start the same
  if (pathname.startsWith('/shopv2')) {
    filterPathName = '/shopv2';
  } else if (pathname.startsWith('/shop')) {
    filterPathName = '/shop';
  }
  //end....................................

  const { isAuthenticated } = useAuthState();
  const { categoriesWithSub, close } = props;

  const [subMenu, setSubMenu] = useState<CategoriesWithSub>();
  const [depth, setDepth] = useState<number>(0);

  const handleLogout = () => {
    signOut();
    close();
  };

  return (
    <div className={styles.root}>
      <nav>
        <div className={styles.headerAuth}>
    

          {depth === 0 && isAuthenticated === true && (
            <div
              className={styles.welcomeContainer}
              role={'presentation'}
              onClick={() => setDepth(-1)}
            >
              <span className={styles.welcomeMessage}>Welcome, John</span>
              <NavigateNextIcon/>
            </div>
          )}

          {depth === -1 && isAuthenticated === true && (
            <div
              className={styles.previousLinkContainer}
              onClick={() => setDepth(0)}
              role={'presentation'}
            >
              <div className={styles.previousIcon}>
                <NavigateNextIcon/>
              </div>
              <span>my account</span>
            </div>
          )}

          {depth === 1 && (
            <div
              className={styles.previousLinkContainer}
              onClick={() => setDepth(0)}
              role={'presentation'}
            >
              <div className={styles.previousIcon}>
                <NavigateNextIcon/>
              </div>
              <span>Shop</span>
            </div>
          )}

          {depth === 2 && subMenu && (
            <div
              className={styles.previousLinkContainer}
              onClick={() => setDepth(1)}
              role={'presentation'}
            >
              <div className={styles.previousIcon}>
                <NavigateNextIcon/>
              </div>
              <span>{subMenu.category.name}</span>
            </div>
          )}
        </div>

        <div className={styles.mobileNavContainer}>
   


          {depth === -1 && (
            <>
     
              <div className={styles.navFooter}>
                <div
                  className={styles.logoutContainer}
                  role={'presentation'}
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  <span>Sign out </span>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
});

export default MobileNavigation;