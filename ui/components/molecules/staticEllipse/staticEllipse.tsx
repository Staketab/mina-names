import React, { useState, useEffect, ReactNode } from "react";

import styles from "./index.module.css";
import classNames from "classnames";
import { View } from "@/comman/types";
import { robotoMedium } from "@/app/fonts";
import { useMedia } from "@/hooks";
import Link from "next/link";
import { CopyIcon } from "@/components/atoms/copyIcon";

const StaticEllipse = ({
  text,
  view,
  isActive,
  className,
  children,
  style,
  link,
  isCopy,
}: {
  text: string;
  view: View;
  isActive?: boolean;
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  link?: string;
  isCopy?: Boolean;
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

  if (link) {
    const isExternal = link.includes("http");

    return (
      <div
        className={classNames(
          styles.wrapper,
          robotoMedium.className,
          className
        )}
        style={{ ...style }}
      >
        <Link href={link} target={isExternal ? "_blank" : "_self"}>
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
        </Link>

        <div>{children}</div>
        {isCopy && <CopyIcon value={text} isActive={isActive} />}
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.wrapper, robotoMedium.className, className, {
        [styles.active]: isActive,
      })}
      style={{ ...style }}
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
      {isCopy && <CopyIcon value={text} isActive={isActive} />}
    </div>
  );
};

export default StaticEllipse;
