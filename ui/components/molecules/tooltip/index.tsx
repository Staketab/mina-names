"use client";
import React, { ReactNode, useRef } from "react";

import classNames from "classnames";
import styles from "./index.module.css";
import TooltipWrapper from "./tooltipWrapper";
import InfoIconComponent from "./infoIcon";

type InfoTooltipProps = {
  text: string;
  className?: string;
  children?: ReactNode;
};

const Tooltip = ({
  text,
  className,
  children,
}: InfoTooltipProps): JSX.Element => {
  const controlRef = useRef(null);



  return (
    <div className={classNames(styles.infoTooltip, className)}>
      <TooltipWrapper text={text} controlRef={controlRef}>
        <div className={classNames(styles.icon, className)} ref={controlRef}>
          {children ?? <InfoIconComponent />}
        </div>
      </TooltipWrapper>
    </div>

    
  );
};

export default Tooltip;
