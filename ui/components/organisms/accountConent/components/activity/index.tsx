import { DataTable, ORDER_BY, Routs, SORT_BY } from "@/comman/types";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { Table } from "@/components/organisms/table";
import { useEffect, useState } from "react";
import { getActivities } from "@/app/actions/actions";
import { activitiesConfig } from "./constants";
import { useParams } from "next/navigation";
import { useStoreContext } from "@/store";
import { addMinaText } from "@/helpers/name.helper";
import { chain } from "@/comman/constants";

const initPage = 0;
const initSize = 20;

const ActivityContent = (): JSX.Element => {
  const [size, setSize] = useState<number>(initSize);
  const [page, setPage] = useState<number>(initPage);
  const [activities, setActivities] = useState<DataTable>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const {
    state: {
      walletData: { accountId },
    },
  } = useStoreContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response: DataTable = await getActivities({
          accountAddress: (params?.id as string) || accountId,
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
              domainNameRedirect: `${Routs.NAME}/${item.domainId}`,
              ...(item.transaction
                ? {
                    redirectLink: `https://minascan.io/${chain}/tx/${item.transaction}`,
                  }
                : []),
              domainName: addMinaText(item?.domainName),
            };
          }),
        });
      } catch (error) {}
      setLoading(false);
    })();
  }, [params?.id, size, page]);

  const onSize = (size) => {
    setPage(initPage);
    setSize(size);
  };

  const onPage = (page) => {
    setPage(page);
  };
  console.log(activities);

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
