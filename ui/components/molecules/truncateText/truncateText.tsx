import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import TooltipWrapper from "../tooltip/tooltipWrapper";
import classNames from "classnames";
import { manropeSemiBold } from "@/app/fonts";

export default function TruncateText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const getStatusTruncateText = () => {
    if (textRef.current?.scrollWidth > textRef.current?.clientWidth) {
      return setIsTruncated(true);
    }
    return setIsTruncated(false);
  };

  const tooltipText = isTruncated ? children : null;

  useEffect(() => {
    getStatusTruncateText();
  }, [textRef?.current]);

  return (
    <TooltipWrapper text={tooltipText} controlRef={textRef}>
      <div
        style={{ maxWidth: "100%", marginBottom: 0 }}
        ref={textRef}
        className={classNames(
          styles.truncatedWrapper,
          manropeSemiBold.className,
          className
        )}
      >
        {children}
      </div>
    </TooltipWrapper>
  );
}
