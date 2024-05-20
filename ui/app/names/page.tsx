"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { AccountContent } from "@/components/organisms/accountConent";
import { useStoreContext } from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Routs } from "@/comman/types";

export default function Page() {
  const {
    state: {
      walletData: { accountId },
    },
  } = useStoreContext();
  const router = useRouter();
  const account =
    typeof window !== 'undefined' &&
    localStorage.getItem("account") &&
    JSON.parse(localStorage.getItem("account"));

  useEffect(() => {
    if (!account?.accountId) {
      router.replace(Routs.HOME);
    }
  }, [account, accountId]);

  return (
    <div className={classNames(style.wrapper, "container")}>
      <AccountContent />
    </div>
  );
}
