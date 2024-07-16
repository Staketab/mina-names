import React, { useState, ReactNode } from "react";
import classNames from "classnames";

import InfoIcon from "./img/InfoIcon.svg";
import ErrorIcon from "./img/error.svg";
import WarningIcon from "./img/warning.svg";
import SucccessIcon from "./img/success.svg";
import CloseIcon from "./img/CloseIcon.svg";
import ScamAlert from "./img/ScamAlert.svg";

import styles from "./index.module.css";
import Image from "next/image";

interface AlertMessageProps {
  text?: string | ReactNode;
  type: "info" | "success" | "error";
  className?: string;
  classNameWrapper?: string;
  closeHandler?: () => void;
  needCloseBtn?: boolean;
  noIcon?: boolean;
}

const AlertMessage = ({
  text,
  type,
  className,
  needCloseBtn,
  noIcon = false,
  classNameWrapper,
  closeHandler = () => {},
}: AlertMessageProps) => {
  const [show, setShow] = useState(true);
  const infoIcon = {
    success: <Image src={SucccessIcon} alt="" />,
    warning: <Image src={WarningIcon} alt="" />,
    info: <Image src={InfoIcon} alt="" />,
    error: <Image src={ErrorIcon} alt="" />,
    normal: <Image src={InfoIcon} alt="" />,
    scam: <Image src={ScamAlert} alt="" />,
  };

  const handleCloseClick = () => {
    closeHandler();
    setShow(false);
  };

  return show ? (
    <div className={classNames(styles.alertMessage, className, [styles[type]])}>
      <div className={classNames(styles.messageWrapper, classNameWrapper)}>
        <div className={styles.messageInfo}>
          {!noIcon && infoIcon[type] && (
            <div className={styles.icon}>{infoIcon[type]}</div>
          )}
          <span
            className={styles.text}
            style={{
              width:
                !noIcon && infoIcon[type]
                  ? `calc(100% - 22px${needCloseBtn ? " - 26px" : ""})`
                  : "100%",
            }}
          >
            {text}
          </span>
        </div>
        {needCloseBtn && (
          <CloseIcon className={styles.closeIcon} onClick={handleCloseClick} />
        )}
      </div>
    </div>
  ) : null;
};

export default AlertMessage;
