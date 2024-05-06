import React from "react";
import infoIcon from "./infoIcon.svg";

import styles from "./index.module.css";
import classNames from "classnames";
import Image from "next/image";

const InfoIconComponent = ({ className }: { className?: string }) => {
  return (
    <span className={classNames(styles.infoIcon, className)}>
      <Image src={infoIcon} alt="" width={20} height={20} />
    </span>
  );
};

export default InfoIconComponent;
