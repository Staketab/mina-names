"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { Navigation } from "@/components/organisms/navigation";
import { AccountContent } from "@/components/organisms/accountConent";
import { useEffect, useState } from "react";
import { getAccountDomains, getDomains, getDomainsMetadata } from "../actions/actions";
import { ORDER_BY, SORT_BY } from "@/comman/types";

export default function Page() {
  const [accountDomains, setAccountDomains] = useState(null);
  const [domains, setDomains] = useState(null);

  useEffect(() => {
    (async () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const response = await getAccountDomains({
        accountAddress: account?.accountId[0],
        page: 0,
        size: 50,
        sortBy: SORT_BY.RESERVATION_TIMESTAMP,
        orderBy: ORDER_BY.DESC,
      });
      setAccountDomains(response);
    })();
    (async () => {
      const response = await getDomains({
        page: 0,
        size: 20,
        sortBy: SORT_BY.RESERVATION_TIMESTAMP,
        orderBy: ORDER_BY.DESC,
      });
      setDomains(response);
    })();
  }, []);

  const handleDomainsMetadata = async () => {
    await getDomainsMetadata('id')
  }

  return (
    <div className={classNames(style.wrapper)}>
      <AccountContent accountDomains={accountDomains}/>
    </div>
  );
}
