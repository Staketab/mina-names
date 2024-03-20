"use client";
import { AccountDomainDetailsResponse } from "@/app/actions/types";
import { Switcher } from "@/components/atoms/switcher";
import { StaticEllipse } from "@/components/molecules/staticEllipse";
import icon from "../../../assets/logo.svg";

import Image from "next/image";

import style from "./index.module.css";
import classNames from "classnames";
import { interMedium } from "@/app/fonts";
import { Name } from "@/components/atoms/name";
import { useState } from "react";
import { ConfirmationModal } from "@/components/molecules/modals/confirmationModal";

const DetailsNameHeader = ({
  accountDomainDetails,
  editImg,
}: {
  accountDomainDetails: AccountDomainDetailsResponse;
  editImg: (value: string) => Promise<void>;
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const handleEdit = () => {
    setOpen(true);
  };
  const { domainImg, domainName, isDefault, ownerAddress } =
    accountDomainDetails;

  return (
    <div className={style.wrapper}>
      <div className={style.leftSide}>
        <div className={style.imgWrapper}>
          <Image src={domainImg || icon} alt="icon" width={120} height={120} />
          <span className={interMedium.className} onClick={handleEdit}>
            Edit
          </span>
        </div>
        <div>
          <div className={style.name}>
            <Name name={domainName} />
            {isDefault && (
              <span
                className={classNames(
                  style.defaultLabel,
                  interMedium.className
                )}
              >
                Default Name
              </span>
            )}
          </div>

          <div className={classNames(interMedium.className, style.address)}>
            Owned by
            <StaticEllipse
              text={ownerAddress}
              view={{ sm: 10, md: 10, lg: 10 }}
              isActive
            />
          </div>
        </div>
      </div>
      <div className={style.rightSide}>
        <Switcher
          text="Set as default name"
          className={style.switcher}
          initialState={isDefault}
        />
      </div>
      <ConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        editImg={editImg}
      />
    </div>
  );
};

export default DetailsNameHeader;
