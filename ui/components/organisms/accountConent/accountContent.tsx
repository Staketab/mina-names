"use client";

import style from "./index.module.css";
import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";
import { NamesContent } from "./components";
import avatarIcon from "../../../assets/avatar.svg";
import { DOMAIN_STATUS, DataTable } from "@/comman/types";
import useWallet from "@/hooks/useWallet";
import { manropeBold } from "@/app/fonts";
import Image from "next/image";
import classNames from "classnames";

const AccountContent = ({ accountDomains }: { accountDomains: DataTable }) => {
  const { accountId } = useWallet();

  if (!accountDomains) return null;

  const data = accountDomains.content.filter(
    ({ domainStatus }) =>
      domainStatus === DOMAIN_STATUS.ACTIVE ||
      domainStatus === DOMAIN_STATUS.PENDING
  );
  return (
    <div className={style.wrapper}>
      <div className={classNames(manropeBold.className, style.header)}>
        <Image src={avatarIcon} alt="" />
        {accountId[0]}
      </div>
      <Tabs
        className={style.contentTabs}
        variant={TABS_VARIANT.light}
        items={[
          {
            content: (
              <NamesContent
                accountDomains={{ ...accountDomains, content: data }}
              />
            ),
            title: "Names",
            value: 1,
          },
          // {
          //   content: <OffersContent />,
          //   title: "Offers",
          //   value: 2,
          // },
          // {
          //   content: <div>Listings</div>,
          //   title: "Listings",
          //   value: 3,
          // },
          {
            content: <div>Activity</div>,
            title: "Activity",
            value: 5,
          },
        ]}
        initValue={1}
      />
    </div>
  );
};

export default AccountContent;
