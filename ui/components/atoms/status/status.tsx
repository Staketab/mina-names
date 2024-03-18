import { DOMAIN_STATUS } from "@/comman/types";
import pendingIcon from "../../../assets/pending.svg";

import style from "./index.module.css";
import classNames from "classnames";
import { interMedium } from "@/app/fonts";
import Image from "next/image";

const Status = ({
  status,
  className,
}: {
  status: DOMAIN_STATUS;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={classNames(style.status, interMedium.className, className, {
        [style.pending]: status === DOMAIN_STATUS.PENDING,
      })}
    >
      {status === DOMAIN_STATUS.PENDING && (
        <Image src={pendingIcon} alt="" width={20} height={20} />
      )}
      <span>{status}</span>
    </div>
  );
};

export default Status;
