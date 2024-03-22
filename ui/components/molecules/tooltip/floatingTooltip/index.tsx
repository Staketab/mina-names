import classNames from "classnames";
import React, { useState, useEffect, ReactNode } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import styles from "./index.module.css";
import { useMedia } from "@/hooks/useMedia";
import { useWindowResize } from "@/hooks/useWindowResixe";
import Portal from "../../portal";

export type FloatingTooltipProps = {
  text?: string;
  controlRef?: React.RefObject<HTMLInputElement>
  onCloseTooltip: () => void,
  onOpenTooltip: () => void,
  open: boolean,
}

export default function FloatingTooltip({
  text,
  controlRef,
  onCloseTooltip,
  onOpenTooltip,
  open,
}: FloatingTooltipProps): JSX.Element {
  const { isGreaterThanQuery } = useMedia(768);
  const [markerLeftIdent, setMarkerLeftIdent] = useState(null);
  const [topIndent, setTopIndent] = useState(null);
  const [leftIdent, setLeftIdent] = useState(null);
  const contentRef = useRef(null);

  const markerHeight = isGreaterThanQuery ? 10 : 0;

  const getIndents = useCallback(() => {
    const contentWidth = contentRef?.current?.clientWidth || 0;
    const controlWidth = controlRef?.current?.clientWidth || 0;
    const controlLeftIndent = controlRef?.current?.getBoundingClientRect().left;
    const controlMiddle = controlWidth / 2 + controlLeftIndent;
    const bodyWidth = document.body.clientWidth;
    let contentLeftIndent = controlMiddle - contentWidth / 2;
    const scrollY = window.scrollY;
    const viewportTop = controlRef?.current?.getBoundingClientRect().bottom;
    if (bodyWidth < contentLeftIndent + contentWidth)
      contentLeftIndent = bodyWidth - contentWidth;
    if (contentLeftIndent <= 0) contentLeftIndent = 10;
    const markerLeftIndent = controlMiddle - contentLeftIndent - 10;
    const contentTopIndent = viewportTop + scrollY + markerHeight - 10 || 0;
    return { contentLeftIndent, markerLeftIndent, contentTopIndent };
  }, [controlRef]);

  const setIndents = useCallback(() => {
    if (!open) return;

    const { contentLeftIndent, markerLeftIndent, contentTopIndent } =
      getIndents();
    setMarkerLeftIdent(markerLeftIndent);
    setTopIndent(contentTopIndent);
    setLeftIdent(contentLeftIndent);
  }, [open, getIndents]);

  const handleWindowResize = useCallback(() => {
    setIndents();
  }, [setIndents]);

  useWindowResize(handleWindowResize);

  useEffect(() => {
    return setLeftIdent(null);
  }, [open]);

  useEffect(() => {
    if (open) {
      handleWindowResize();
    }
  }, [open]);

  useEffect(() => {
    const body = document.body;
    body.addEventListener("touchstart", onCloseTooltip);
    return () => {
      body.removeEventListener("touchstart", onCloseTooltip);
    };
  }, []);

  const showTooltip = open && text !== null && text !== undefined;
  if (!controlRef?.current) return null;

  return showTooltip ? (
    <Portal onClick={onCloseTooltip}>
      <div
        className={classNames(styles.tooltip, "floatingTooltip", {
          [styles.visibleTooltip]: !leftIdent,
        })}
        ref={contentRef}
        onMouseEnter={onOpenTooltip}
        onMouseLeave={onCloseTooltip}
      >
        <div
          className={styles.content}
        >
          {text}
        </div>
      </div>
      <style>{`
                .floatingTooltip {
                    top: ${topIndent}px;
                    left: ${leftIdent}px;
                }
                .floatingTooltip::before, .floatingTooltip::after {
                    left: ${markerLeftIdent}px;
                }
            `}</style>
    </Portal>
  ) : null;
}
