import React, { memo } from 'react';

import styles from './Button.module.css';
import { Link } from 'react-router-dom';

interface Props {
  children: string;
  href?: string;
  target?: string;
  level: 'primary' | 'secondary';
  type?: "button" | "submit" | "reset";
  size?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: any;
  flat?: string;
  link?: string;
  fullWidth?: boolean;
  theme?: any;
}
const Button = memo(({
  children,
  href,
  target,
  level,
  type,
  size,
  disabled,
  onClick,
  className,
  flat,
  link,
  fullWidth,
  theme,
}: Props) => {

  return (
    <div>
      hhhhhhhhhhh
    </div>
  );
});

export default Button;