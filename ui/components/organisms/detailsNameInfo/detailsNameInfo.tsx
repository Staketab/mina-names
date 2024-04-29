"use client";
import { AccountDomainDetailsResponse } from "@/app/actions/types";
import { Switcher } from "@/components/atoms/switcher";
import icon from "../../../assets/default.svg";
import defaultNameApplied from "../../../assets/defaultNameApplied.svg";

import editIcon from "../../../assets/edit.svg";

import Image from "next/image";

import style from "./index.module.css";
import classNames from "classnames";
import { interMedium, manropeBold, manropeMedium } from "@/app/fonts";
import { useState } from "react";
import { setDefaultImg } from "@/app/actions/actions";
import { useStoreContext } from "@/store";
import { Modals } from "@/components/molecules/modals/modals.types";
import { Star } from "@/components/atoms/star";
import { Button } from "@/components/atoms/button";
import { Variant } from "@/components/atoms/button/types";
import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";
import { OwnershipContent, ProfileContent } from "./components";

const DetailsNameInfo = ({
  accountDomainDetails,
  editImg,
}: {
  accountDomainDetails: AccountDomainDetailsResponse;
  editImg: (value: string) => Promise<void>;
}): JSX.Element => {
  const [isDefault, setIsDefault] = useState(accountDomainDetails.isDefault);
  const {
    actions: { openModal },
  } = useStoreContext();
  const handleEdit = () => {
    true;
    openModal(Modals.confirmation, {
      editImg,
    });
  };
  const { domainImg, domainName, ownerAddress } = accountDomainDetails;

  const handleDefaultImg = async () => {
    const response = await setDefaultImg(accountDomainDetails.id);
    setIsDefault(response);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.leftSide}>
          <div className={style.imgWrapper} onClick={handleEdit}>
            <span className={style.domainImg}>
              <Image
                src={icon}
                alt="icon"
                width={120}
                height={120}
              />
            </span>
            <span className={classNames(interMedium.className, style.editIcon)}>
              <Image src={editIcon} alt="Edit" />
            </span>
          </div>
          <div className={style.name}>
            <div className={classNames(manropeBold.className, style.name)}>
              {domainName}
            </div>
            <Star />
            {isDefault && (
              <span
                className={classNames(
                  style.defaultLabel,
                  manropeMedium.className
                )}
              >
                <Image src={defaultNameApplied} alt="" />
                Default Name
              </span>
            )}
          </div>

          {/* <div className={classNames(interMedium.className, style.address)}>
              Owned by
              <StaticEllipse
                text={ownerAddress}
                view={{ sm: 10, md: 10, lg: 10 }}
                isActive
              />
            </div> */}
        </div>
        <div className={style.rightSide}>
          <Switcher
            text="Set as default name"
            className={style.switcher}
            initialState={isDefault}
            onClick={handleDefaultImg}
            disabled={isDefault}
          />
          <Button variant={Variant.grey}>Set Reminder</Button>
          <Button variant={Variant.black}>Extend</Button>
        </div>
      </div>
      <Tabs
        className={style.tabs}
        variant={TABS_VARIANT.blackButton}
        items={[
          {
            content: (
              <ProfileContent accountDomainDetails={accountDomainDetails} />
            ),
            title: "Profile",
            value: 1,
          },
          {
            content: <OwnershipContent />,
            title: "Ownership",
            value: 2,
          },
          {
            content: <div>Offers</div>,
            title: "Offers",
            value: 3,
          },
        ]}
        initValue={1}
      />
    </div>
  );
};

export default DetailsNameInfo;
