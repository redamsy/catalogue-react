import React, { memo } from 'react';


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
  // const classes = level ? [styles.button] : [styles.link];

  // if (level in styles) {
  //   classes.push(styles[level]);
  // }
  // if (size && size in styles) {
  //   classes.push(styles[size]);
  // }
  // if (theme && theme in styles) {
  //   classes.push(styles[theme]);
  // }

  // if (disabled) {
  //   classes.push(styles.disabled);
  // }
  // if (flat) {
  //   classes.push(styles.flat);
  // }
  // if (link) {
  //   classes.push(styles.link);
  // }
  // if (fullWidth) {
  //   classes.push(styles.fullWidth);
  // }
  // if (className) {
  //   classes.push(className);
  // }

  // const classOutput = classes.join(' ');
  return (
    <>
      {!href && (
        <button
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
});

export default Button;