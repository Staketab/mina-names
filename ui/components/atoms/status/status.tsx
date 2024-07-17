import { DOMAIN_STATUS } from "@/comman/types";
import pendingIcon from "../../../assets/pending.svg";

import style from "./index.module.css";
import classNames from "classnames";
import { manropeSemiBold } from "@/app/fonts";
import Image from "next/image";

const Status = ({
  status,
  className,
  onClick,
}: {
  status: DOMAIN_STATUS;
  className?: string;
  onClick?: () => void;
}): JSX.Element => {

  return (
    <div
      onClick={onClick}
      className={classNames(
        style.status,
        manropeSemiBold.className,
        className,
        {
          [style.pending]: status === DOMAIN_STATUS.PENDING,
        }
      )}
    >
      {status === DOMAIN_STATUS.PENDING && (
        <Image
          src={pendingIcon}
          alt=""
          width={20}
          height={20}
          className={style.icon}
        />
      )}
      <span>{status}</span>
    </div>
  );
};

export default Status;
