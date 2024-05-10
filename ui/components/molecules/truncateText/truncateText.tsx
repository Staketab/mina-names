import React, { useRef } from "react";
import styles from "./index.module.css";
import TooltipWrapper from "../tooltip/tooltipWrapper";
import classNames from "classnames";
import { manropeSemiBold } from "@/app/fonts";

export default function TruncateText({ children }) {
  const textRef = useRef(null);

  const getStatusTruncateText = () => {
    if (textRef.current?.scrollWidth > textRef.current?.clientWidth) {
      return true;
    }
    return false;
  };

  const tooltipText = getStatusTruncateText() ? children : null;

  return (
    <TooltipWrapper text={tooltipText} controlRef={textRef}>
      <div
        style={{ maxWidth: "100%", marginBottom: 0 }}
        ref={textRef}
        className={classNames(
          styles.truncatedWrapper,
          manropeSemiBold.className
        )}
      >
        {children}
      </div>
    </TooltipWrapper>
  );
}
