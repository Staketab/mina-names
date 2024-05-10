"use client";

import style from "./index.module.css";
import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";
import { ActivityContent, NamesContent } from "./components";
import avatarIcon from "../../../assets/avatar.svg";
import useWallet from "@/hooks/useWallet";
import { manropeBold } from "@/app/fonts";
import Image from "next/image";
import classNames from "classnames";
import { useParams } from "next/navigation";

const AccountContent = () => {
  const { accountId } = useWallet();
  const params = useParams()
  return (
    <div className={style.wrapper}>
      <div className={classNames(manropeBold.className, style.header)}>
        <Image src={avatarIcon} alt="" />
        {params?.id || accountId?.[0]}
      </div>
      <Tabs
        className={style.contentTabs}
        variant={TABS_VARIANT.light}
        items={[
          {
            content: <NamesContent />,
            title: "Names",
            value: 1,
          },
          {
            content: <ActivityContent />,
            title: "Activity",
            value: 2,
          },
        ]}
        initValue={1}
      />
    </div>
  );
};

export default AccountContent;
