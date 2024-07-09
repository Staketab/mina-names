import { getDomainActivities } from "@/app/actions/actions";
import { chain } from "@/comman/constants";
import { DataTable, ORDER_BY, Routs, SORT_BY } from "@/comman/types";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { activitiesConfig } from "@/components/organisms/accountConent/components/activity/constants";
import { Table } from "@/components/organisms/table";
import { addMinaText } from "@/helpers/name.helper";
import { useEffect, useState } from "react";

const initPage = 0;
const initSize = 20;

const ActivityContent = ({
  domainName,
}: {
  domainName: string;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [size, setSize] = useState<number>(initSize);
  const [page, setPage] = useState<number>(initPage);
  const [activities, setActivities] = useState<DataTable>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: DataTable = await getDomainActivities({
          domainName: domainName,
          page,
          size,
          sortBy: SORT_BY.TIMESTAMP,
          orderBy: ORDER_BY.DESC,
        });

        setActivities({
          ...response,
          content: response?.content?.map((item) => {
            return {
              ...item,
              redirectLink: `https://minascan.io/${chain}/tx/${item.transaction}`,
              domainName: addMinaText(item?.domainName),
            };
          }),
        });
      } catch (error) {}
      setLoading(false);
    })();
  }, [domainName, size, page]);

  const onSize = (size) => {
    setPage(initPage);
    setSize(size);
  };

  const onPage = (page) => {
    setPage(page);
  };

  return (
    <Table
      data={activities}
      config={activitiesConfig}
      isLoading={loading}
      currentPage={page}
      pageLimit={size}
      totalElements={activities?.totalElements}
      pagesCount={activities?.totalPages}
      typeView={TypeView.LIST}
      isHiddenTopPagination
      limitOptions={[
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "50", value: 50 },
      ]}
      sortBy={SORT_BY.RESERVATION_TIMESTAMP}
      orderBy={ORDER_BY.DESC}
      onChangePage={onPage}
      onChangeLimit={onSize}
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
