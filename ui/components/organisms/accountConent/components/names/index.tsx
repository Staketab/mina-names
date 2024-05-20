import { TABS_VARIANT, Tabs } from "@/components/molecules/tabs";

import style from "./index.module.css";
import AllContent from "./allContent";
import { DOMAIN_STATUS, DataTable, ORDER_BY, SORT_BY } from "@/comman/types";
import { SwitchView } from "@/components/atoms/switchView";
import { useEffect, useState } from "react";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { getAccountDomains } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import { useStoreContext } from "@/store";
import { addMinaText } from "@/helpers/name.helper";
const initPage = 0;
const initSize = 50;

const NamesContent = (): JSX.Element => {
  const [size, setSize] = useState<number>(initSize);
  const [page, setPage] = useState<number>(initPage);

  const [accountDomains, setAccountDomains] = useState<DataTable>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const {
    state: {
      walletData: { accountId },
    },
  } = useStoreContext();
  const [typeView, setTypeView] = useState<TypeView>(TypeView.CARD);
  const handleSwitchView = (typeView: TypeView) => {
    setTypeView(typeView);
  };

  const filterByPendingAndActiveStatus = ({ domainStatus }) => {
    return (
      domainStatus === DOMAIN_STATUS.ACTIVE ||
      domainStatus === DOMAIN_STATUS.PENDING
    );
  };

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
          });
          const accountDomains = response?.content
            .filter(filterByPendingAndActiveStatus)
            .map(mapDomainImgByIPFS);
          setAccountDomains({ ...response, content: accountDomains });
        } catch (error) {}
        setLoading(false);
      })();
      return;
    }
  }, [params?.id, accountId, size, page]);

  const onSize = (size) => {
    setPage(initPage);
    setSize(size);
  };

  const onPage = (page) => {
    setPage(page);
  };

  return (
    <div className={style.wrapper}>
      <Tabs
        className={style.tabs}
        variant={TABS_VARIANT.blackButton}
        items={[
          {
            content: (
              <AllContent
                accountDomains={accountDomains}
                typeView={typeView}
                loading={loading}
                onSize={onSize}
                onPage={onPage}
                page={page}
                size={size}
              />
            ),
            title: "All",
            value: 1,
          },
          {
            content: (
              <AllContent
                typeView={typeView}
                loading={loading}
                onSize={onSize}
                onPage={onPage}
                page={page}
                size={size}
                accountDomains={{
                  ...accountDomains,
                  content: accountDomains?.content?.filter(
                    ({ domainStatus }) => {
                      return DOMAIN_STATUS.PENDING === domainStatus;
                    }
                  ),
                }}
              />
            ),
            title: "Pending",
            value: 2,
          },
          {
            content: (
              <AllContent
                typeView={typeView}
                loading={loading}
                onSize={onSize}
                onPage={onPage}
                page={page}
                size={size}
                accountDomains={{
                  ...accountDomains,
                  content: accountDomains?.content?.filter(
                    ({ domainStatus }) => {
                      return DOMAIN_STATUS.ACTIVE === domainStatus;
                    }
                  ),
                }}
              />
            ),
            title: "Active",
            value: 3,
          },
        ]}
        initValue={1}
      />
      <SwitchView onClick={handleSwitchView} className={style.switchView} />
    </div>
  );
};

export { NamesContent };
