import React, { useState, useEffect } from "react";
import icon from "./img/Copy.svg";
import iconPressed from "./img/CopyPressed.svg";

import styles from "./copyIcon.module.css";
import classNames from "classnames";
import Image from "next/image";
type CopyIconProps = {
  onClick?: () => void;
  className?: string;
  value: string
};

const CopyIcon = ({ onClick, className, value }: CopyIconProps): JSX.Element => {
  const [pressed, setPressed] = useState(false);
  const [showPressed, setShowPressed] = useState(false);

  const copyHandler = (e) => {
    e.stopPropagation();
    onClick?.();
      navigator.clipboard.writeText(value);
    if (!pressed) {
      setPressed(true);
      setTimeout(() => {
        setShowPressed(true);
      }, 150);
    }
  };

  useEffect(() => {
    if (pressed) {
      const timeout = setTimeout(() => {
        setPressed(false);
      }, 1500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [pressed]);

  useEffect(() => {
    if (showPressed) {
      const timeout = setTimeout(() => {
        setShowPressed(false);
      }, 1350);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showPressed]);

  return (
    <>
      <div
        className={classNames(styles.wrapper, className)}
        onClick={copyHandler}
      >
        <Image
          src={icon}
          alt=""
          className={classNames(styles.copyIcon, {
            [styles.animationSlide]: pressed,
          })}
        />
        {showPressed && (
          <Image
            src={iconPressed}
            alt=""
            className={classNames(styles.copyIcon, styles.pressed)}
          />
        )}
      </div>
    </>
  );
};

export { CopyIcon };
