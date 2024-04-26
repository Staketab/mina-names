import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./PopupOverlay.module.css";
import { useMedia } from "../../../hooks/useMedia";
import { usePathname, useRouter } from "next/navigation";
import { useStoreContext } from "@/store";

type PopupOverlayProps = {
  children: React.ReactNode;
  onClose?: () => void;
  position?: "bottom" | "center" | "top";
  show?: boolean;
  animation?: "slideUp" | "appear";
  forwardedRef?: any;
  height?: string;
};

const animations = {
  appear: {
    in: style.appear,
    out: style.disappear,
  },
  slideUp: {
    in: style.slideUpIn,
    out: style.slideUpOut,
  },
  slideRight: {
    in: style.slideRightIn,
    out: style.slideRightOut,
  },
  slideLeft: {
    in: style.slideLeftIn,
    out: style.slideLeftOut,
  },
};

const PopupOverlay = ({
  children,
  onClose = () => {},
  position = "bottom",
  show,
  animation = "slideUp",
  forwardedRef,
  height = "auto",
}: PopupOverlayProps): JSX.Element | null => {
  const {
    actions: { closeModal },
  } = useStoreContext();
  const pathname = usePathname();

  const overlayRef = useRef(null);

  const [showState, setShowState] = useState(false);
  const [active, setActive] = useState(false);
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
  const [isTextSelected, setIsTextSelected] = useState(false);
  const initBodyWidth =
    (typeof document !== "undefined" && document.body.offsetWidth) || 0;
  const media = useMedia();

  const checkSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setIsTextSelected(true);
    } else {
      setIsTextSelected(false);
    }
  };

  const getAppWrapper = (): HTMLElement | null => {
    return document.querySelector(".app-wrapper");
  };
  const showPopup = (initBodyWidth: number) => {
    setActive(true);
    setShowState(true);

    const appWrapper = getAppWrapper();
    appWrapper && media.greater.sm && (appWrapper.style.position = "fixed");
    document
      .getElementById("popup-overlay")
      ?.classList.add(style.overlayWrapperActive);
    // document.body.style.overflowY = "hidden";

    const currentBodyWidth = document.body.offsetWidth;
    if (initBodyWidth !== currentBodyWidth) {
      document.body.style.paddingRight = `${
        currentBodyWidth - initBodyWidth
      }px`;
      appWrapper &&
        (appWrapper.style.paddingRight = `${
          currentBodyWidth - initBodyWidth
        }px`);
    }
  };

  const closePopup = (unmount = false) => {
    const appWrapper = getAppWrapper();
    if (appWrapper) {
      appWrapper.style.position = "relative";
      appWrapper.style.paddingRight = "0px";
    }
    appWrapper && media.greater.sm && (appWrapper.style.position = "static");
    const popupOverlay = document.getElementById("popup-overlay");
    const completeClose = popupOverlay && popupOverlay.children.length < 2;
    !unmount && setActive(false);
    if (completeClose)
      document
        .getElementById("popup-overlay")
        ?.classList.remove(style.overlayWrapperActive);
    const timeout = setTimeout(() => {
      !unmount && setShowState(false);
      !unmount && onClose();
      if (completeClose) {
        document.body.style.paddingRight = "0";
        // document.body.style.overflowY = "hidden";
      }
    }, 300);
    setTimeoutID(timeout);
  };

  const handleClose = () => {
    if (active && !isTextSelected) {
      // closePopup();
      // console.log("sadfdsfds");

      closeModal();
    } else {
      setIsTextSelected(false);
    }
  };

  useEffect(() => {
    if (show) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutID);
    };
  }, [active, timeoutID]);

  useEffect(() => {
    if (show) showPopup(initBodyWidth);
    else if (!show && showState) closePopup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    return () => {
      closePopup(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showState
    ? createPortal(
        <>
          <div
            className={classNames(style.wrapper, {
              [animations.appear.in]: active,
              [animations.appear.out]: !active,
            })}
            ref={overlayRef}
            onClick={handleClose}
            onMouseUp={checkSelection}
          >
            <div
              className={classNames(style.popupOverlay, style[position], {
                [animations[animation]?.in]: active,
                [animations[animation]?.out]: !active,
              })}
              ref={forwardedRef ?? null}
              style={{ height }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </>,
        document.getElementById("popup-overlay") as HTMLElement
      )
    : null;
};

export default PopupOverlay;
