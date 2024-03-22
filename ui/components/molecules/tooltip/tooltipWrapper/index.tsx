"use client";
import React, { ReactNode, useState } from "react";
import FloatingTooltip from "../floatingTooltip";

type TooltipWrapperProps = {
  text?: string;
  controlRef?: React.RefObject<HTMLInputElement>;
  children?: ReactNode;
};

const TooltipWrapper = ({
  children,
  text,
  controlRef,
}: TooltipWrapperProps): JSX.Element | null => {
  const [open, setOpen] = useState(false);

  const onOpenTooltip = () => {
    setOpen(true);
  };
  const onCloseTooltip = () => {
    setOpen(false);
  };
  if (!children) {
    return null;
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <>
              {React.cloneElement(child, {
                ...child.props,
                onMouseEnter: onOpenTooltip,
                onMouseLeave: onCloseTooltip,
                onClick: onOpenTooltip,
              })}
              <FloatingTooltip
                text={text}
                open={open}
                controlRef={controlRef}
                onOpenTooltip={onOpenTooltip}
                onCloseTooltip={onCloseTooltip}
              />
            </>
          );
        } else {
          return child;
        }
      })}
    </>
  );
};

export default TooltipWrapper;
