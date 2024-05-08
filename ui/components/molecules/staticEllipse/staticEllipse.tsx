import React, { useState, useEffect, ReactNode } from "react";

import styles from "./index.module.css";
import classNames from "classnames";
import { useMedia } from "../../../hooks/useMedia";
import { View } from "@/comman/types";
import { robotoMedium } from "@/app/fonts";

const StaticEllipse = ({
  text,
  view,
  isActive,
  className,
  children,
  style,
}: {
  text: string;
  view: View;
  isActive?: boolean;
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}): JSX.Element | null => {
  const [firstString, setFirstString] = useState<string | null>(null);
  const [secondString, setSecondString] = useState<string | null>(null);
  const [string, setString] = useState<string | null>(null);
  const {
    greater: { sm: smScreen, lg: lgScreen, md: mdScreen },
  } = useMedia();

  const sliceString = (numberLetter: number) => {
    const minLengthWord = numberLetter * 2 + 2;
    if (text.length <= minLengthWord) {
      setString(text);
      return;
    }
    const startText = text.slice(0, numberLetter);
    const endText = text.slice(text.length - numberLetter);
    setFirstString(startText);
    setSecondString(endText);
  };

  useEffect(() => {
    setString(null);
    if (!view) return;
    if (!smScreen) {
      sliceString(view.sm === 4 ? view.sm : view.sm - 2);
      return;
    }
    if (smScreen && !lgScreen) {
      sliceString(view.md === 4 ? view.md : view.md - 2);
      return;
    }
    if (lgScreen) {
      sliceString(view.lg === 4 ? view.lg : view.lg - 2);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smScreen, lgScreen, mdScreen, view, text]);

  if ((!firstString || !secondString || !text) && !string) return null;

  return (
    <div
      className={classNames(styles.wrapper, robotoMedium.className, className, {
        [styles.active]: isActive,
      })}
      style={{...style}}
    >
      {string ? (
        <div className={styles.string}>{string}</div>
      ) : (
        <>
          <div className={classNames(styles.string, styles.stringWithDots)}>
            {firstString}
            <div className={styles.dots}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
          <div className={styles.string}>{secondString}</div>
        </>
      )}
      <div className={styles.copyIcon}>{children}</div>
    </div>
  );
};

export default StaticEllipse;
