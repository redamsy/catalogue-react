import React, { Ref } from 'react';
import styles from './ThemeLink.module.css';
import { Link } from 'react-router-dom';

interface Props {
    children: string;
    to: string;
    onClick: () => void;
    isActive?: boolean;
}
const ThemeLink = React.forwardRef(({ children, to, onClick, isActive}: Props, themeRef: Ref<HTMLDivElement>) => {
  return (
    <div
      onClick={onClick}
      role={'presentation'}
      className={`${styles.root} ${isActive === true ? styles.active : ''}`}
      ref={themeRef}
    >
      <Link className={`${styles.link}`} to={to}>
        {children}
      </Link>
    </div>
  );
});

export default ThemeLink;