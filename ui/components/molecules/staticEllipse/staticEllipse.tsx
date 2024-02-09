import React, { useState, useEffect } from "react";

import style from "./index.module.css";
import classNames from "classnames";
import { View } from "../../../comman/types";
import { useMedia } from "../../../hooks/useMedia";

const StaticEllipse = ({
  text,
  view,
  isActive,
}: {
  text: string;
  view: View;
  isActive?: boolean;
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
      className={classNames(style.wrapper, "t-robot-medium", {
        [style.active]: isActive,
      })}
    >
      {string ? (
        <div className={style.string}>{string}</div>
      ) : (
        <>
          <div className={style.string}>{firstString}</div>
          <div className={style.dots}>
            <span className={style.dot} />
            <span className={style.dot} />
            <span className={style.dot} />
          </div>
          <div className={style.string}>{secondString}</div>
        </>
      )}
    </div>
  );
};

export default StaticEllipse;
