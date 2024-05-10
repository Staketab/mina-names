import { DataTable, ORDER_BY, SORT_BY } from "@/comman/types";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { Table } from "@/components/organisms/table";
import { useEffect, useState } from "react";
import { getActivities } from "@/app/actions/actions";
import { activitiesConfig } from "./constants";

const ActivityContent = (): JSX.Element => {
  const [activities, setActivities] = useState<DataTable>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const account = JSON.parse(localStorage.getItem("account"));
        const response = await getActivities({
          accountAddress: account?.accountId?.[0],
          page: 0,
          size: 50,
          sortBy: SORT_BY.TIMESTAMP,
          orderBy: ORDER_BY.DESC,
        });

        setActivities(response);
      } catch (error) {}
      setLoading(false);
    })();
  }, []);

  return (
    <Table
      data={activities}
      config={activitiesConfig}
      isLoading={loading}
      currentPage={0}
      pageLimit={50}
      totalElements={activities?.totalElements}
      pagesCount={activities?.totalPages}
      typeView={TypeView.LIST}
      isHiddenTopPagination
      limitOptions={[
        { text: "10", value: 10 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
      ]}
      sortBy={SORT_BY.RESERVATION_TIMESTAMP}
      orderBy={ORDER_BY.DESC}
      onChangePage={(data) => {
        console.log(data);
      }}
      onChangeLimit={(data) => {
        console.log(data);
      }}
      onChangeSort={(data) => {
        console.log(data);
      }}
      onChangeOrder={(data) => {
        console.log(data);
      }}
    />
  );
};

export { ActivityContent };
