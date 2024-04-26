"use client";
import classNames from "classnames";

import style from "./index.module.css";
import { AccountContent } from "@/components/organisms/accountConent";
import { useEffect, useState } from "react";
import { getAccountDomains, getDomainsMetadata } from "../actions/actions";
import { ORDER_BY, SORT_BY } from "@/comman/types";

export default function Page() {
  const [accountDomains, setAccountDomains] = useState(null);

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
  }, []);

  const handleDomainsMetadata = async () => {
    await getDomainsMetadata("id");
  };

  return (
    <div className={classNames(style.wrapper, "container")}>
      <AccountContent accountDomains={accountDomains} />
    </div>
  );
}
