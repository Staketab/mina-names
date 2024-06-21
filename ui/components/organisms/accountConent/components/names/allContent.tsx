import { Table } from "@/components/organisms/table";
import { ScoringConfig } from "../../constants";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { DOMAIN_STATUS, DataTable, ORDER_BY, SORT_BY } from "@/comman/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAccountDomains } from "@/app/actions/actions";
import { useStoreContext } from "@/store";
import { addMinaText } from "@/helpers/name.helper";

const initPage = 0;
const initSize = 50;

const AllContent = ({
  typeView,
  domainStatus,
}: {
  typeView: TypeView;
  domainStatus?: DOMAIN_STATUS;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [size, setSize] = useState<number>(initSize);
  const [page, setPage] = useState<number>(initPage);
  const [accountDomains, setAccountDomains] = useState<DataTable>(null);

  const params = useParams();

  const {
    state: {
      walletData: { accountId },
    },
  } = useStoreContext();
  const mapDomainImgByIPFS = (domain) => {
    const imgHash =
      domain?.ipfsImg &&
      JSON.parse(domain?.ipfsImg)?.linkedObject?.storage?.slice(2);
    return {
      ...domain,
      domainName: addMinaText(domain?.domainName),
      domainImg:
        (imgHash && `https://gateway.pinata.cloud/ipfs/${imgHash}`) || null,
    };
  };
  useEffect(() => {
    if (params?.id || accountId) {
      (async () => {
        try {
          setLoading(true);
          const response = await getAccountDomains({
            accountAddress: (params?.id as string) || accountId,
            page: page,
            size: size,
            sortBy: SORT_BY.RESERVATION_TIMESTAMP,
            orderBy: ORDER_BY.DESC,
            domainStatus: domainStatus,
          });
          const accountDomains = response?.content.map(mapDomainImgByIPFS);
          setAccountDomains({ ...response, content: accountDomains });
        } catch (error) {}
        setLoading(false);
      })();
      return;
    }
  }, [domainStatus, params?.id, accountId, size, page]);

  const onSize = (size) => {
    setPage(initPage);
    setSize(size);
  };

  const onPage = (page) => {
    setPage(page);
  };
  return (
    <Table
      data={accountDomains}
      config={ScoringConfig}
      isLoading={loading}
      currentPage={page}
      pageLimit={size}
      totalElements={accountDomains?.totalElements}
      pagesCount={accountDomains?.totalPages}
      typeView={typeView}
      isHiddenTopPagination
      limitOptions={[
        { text: "10", value: 10 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
      ]}
      sortBy={SORT_BY.RESERVATION_TIMESTAMP}
      orderBy={ORDER_BY.DESC}
      onChangePage={(page) => {
        onPage(page);
      }}
      onChangeLimit={(size) => {
        onSize(size);
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

export default AllContent;
