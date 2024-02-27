"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { Navigation } from "@/components/organisms/navigation";
import { AccountContent } from "@/components/organisms/accountConent";
import { useEffect, useState } from "react";
import { getAccountDomains } from "../actions";
import { ORDER_BY, SORT_BY } from "@/comman/types";

export default function Page() {
  const [accountDomains, setAccountDomains] = useState(null);
  useEffect(() => {
    (async () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const url = {};
      const response = await getAccountDomains({
        accountAddress: account?.accountId[0],
        page: 0,
        size: 50,
        sortBy: SORT_BY.RESERVATION_TIMESTAMP,
        orderBy: ORDER_BY.DESC,
      });
      setAccountDomains(response);
    })();
  }, []);

  return (
    <div className={classNames(style.wrapper)}>
      <Navigation />
      <AccountContent />
    </div>
  );
}
