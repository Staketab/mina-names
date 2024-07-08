"use client";
import { AccountDomainDetailsResponse } from "@/app/actions/types";
import { Switcher } from "@/components/atoms/switcher";
import icon from "../../../assets/domainImg.svg";
import defaultNameApplied from "../../../assets/defaultNameApplied.svg";

import editIcon from "../../../assets/edit.svg";

import Image from "next/image";

import style from "./index.module.css";
import classNames from "classnames";
import { interMedium, manropeBold, manropeMedium } from "@/app/fonts";
import { useState } from "react";
import { removeDefaultName, setDefaultName } from "@/app/actions/actions";
import { useStoreContext } from "@/store";
import { Modals } from "@/components/molecules/modals/modals.types";
import { Star } from "@/components/atoms/star";
import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";
import { ProfileContent } from "./components";
import { addMinaText } from "@/helpers/name.helper";
import { ActivityContent } from "./components/activity";

const DetailsNameInfo = ({
  accountDomainDetails,
}: {
  accountDomainDetails: AccountDomainDetailsResponse;
}): JSX.Element => {
  const [isDefault, setIsDefault] = useState<boolean>(
    accountDomainDetails.isDefault
  );
  const [removeAndSetDefaultNameLoading, setRemoveAndSetDefaultNameLoading] =
    useState<boolean>(false);
  const {
    state: {
      walletData: { accountId },
    },
    actions: { openModal },
  } = useStoreContext();

  const handleEdit = (): void => {
    isOwner &&
      openModal(Modals.confirmation, {
        accountDomainDetails,
      });
  };
  const { domainName, ownerAddress } = accountDomainDetails;
  const isOwner = ownerAddress === accountId;

  const handleDefaultName = async () => {
    if (!isOwner) return;
    try {
      setRemoveAndSetDefaultNameLoading(true);
      if (isDefault) {
        const response = await removeDefaultName(accountDomainDetails.id);
        setRemoveAndSetDefaultNameLoading(false);
        setIsDefault(!response);
      } else {
        const response = await setDefaultName(accountDomainDetails.id);
        setRemoveAndSetDefaultNameLoading(false);
        setIsDefault(response);
      }
    } catch (error) {}
  };

  const imgHash =
    accountDomainDetails?.oldMetadata?.ipfsImg &&
    JSON.parse(
      accountDomainDetails?.oldMetadata?.ipfsImg
    )?.linkedObject?.storage?.slice(2);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.leftSide}>
          <div className={style.imgWrapper} onClick={handleEdit}>
            <span
              className={classNames(style.domainImg, {
                [style.ownerDomainImg]: isOwner,
              })}
            >
              <Image
                src={
                  (imgHash && `https://gateway.pinata.cloud/ipfs/${imgHash}`) ||
                  icon
                }
                alt="icon"
                width={64}
                height={64}
              />
            </span>
            {isOwner && (
              <span
                className={classNames(interMedium.className, style.editIcon)}
              >
                <Image src={editIcon} alt="Edit" />
              </span>
            )}
          </div>
          <div className={style.name}>
            <div className={classNames(manropeBold.className, style.name)}>
              {addMinaText(domainName)}
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
        </div>
        {isOwner && (
          <div className={style.rightSide}>
            <Switcher
              text="Set as default name"
              className={style.switcher}
              initialState={isDefault}
              onClick={handleDefaultName}
              disabled={removeAndSetDefaultNameLoading || !isOwner}
            />
          </div>
        )}
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
            content: (
              <ActivityContent domainName={accountDomainDetails.domainName} />
            ),
            title: "Activity",
            value: 2,
          },
        ]}
        initValue={1}
      />
    </div>
  );
};

export default DetailsNameInfo;
