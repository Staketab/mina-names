import { Table } from "@/components/organisms/table";
import { ScoringConfig } from "../../constants";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { DOMAIN_STATUS, DataTable, ORDER_BY, SORT_BY } from "@/comman/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAccountDomains } from "@/app/actions/actions";
import { useStoreContext } from "@/store";
import { addMinaText } from "@/helpers/name.helper";
import { Modals } from "@/components/molecules/modals/modals.types";

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
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const params = useParams();
  const {
    actions: { setAdditionData },
  } = useStoreContext();

  const {
    state: {
      walletData: { accountId },
    },
    actions: { openModal },
  } = useStoreContext();
  const mapDomainImgByIPFS = (domain) => {
    return {
      ...domain,
      domainName: addMinaText(domain?.domainName),
      ...(domain?.domainStatus === DOMAIN_STATUS.PENDING
        ? {
            handlePendingStatus: () => {
              setSelectedDomainId(domain.id);
              openModal(Modals.pending, {
                isSendToCloudWorker: domain.isSendToCloudWorker,
                zkTxId: domain.zkTxId,
                domainStatus: domain.domainStatus,
                startTimestamp: domain.startTimestamp,
                transaction: domain.transaction
              });
            },
          }
        : []),
      domainImg:
        (domain?.domainImg &&
          domain?.domainImg +
            "?pinataGatewayToken=gFuDmY7m1Pa5XzZ3bL1TjPPvO4Ojz6tL-VGIdweN1fUa5oSFZXce3y9mL8y1nSSU") ||
        null,
    };
  };

  const getData = async (id: string): Promise<void> => {
    try {
      const response = await getAccountDomains({
        accountAddress: id,
        page: page,
        size: size,
        sortBy: SORT_BY.RESERVATION_TIMESTAMP,
        orderBy: ORDER_BY.DESC,
        domainStatus: domainStatus,
      });
      const accountDomains = response?.content.map(mapDomainImgByIPFS);
      setAccountDomains({ ...response, content: accountDomains });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params?.id || accountId) {
      setLoading(true);
      const interval = setInterval(() => {
        getData((params?.id as string) || accountId);
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [domainStatus, params?.id, accountId, size, page]);

  useEffect(() => {
    if (selectedDomainId) {
      const domain = accountDomains?.content?.find(
        (item) => item.id === selectedDomainId
      );
      domain?.zkTxId && setAdditionData(domain);
    }
  }, [accountDomains]);

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
