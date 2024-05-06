import { Table } from "@/components/organisms/table";
import { ScoringConfig } from "../../constants";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { DataTable, ORDER_BY, SORT_BY } from "@/comman/types";

const AllContent = ({
  accountDomains,
  typeView,
}: {
  accountDomains: DataTable;
  typeView: TypeView;
}): JSX.Element => {
  const newAccountDomains = {
    ...accountDomains,
    content: accountDomains.content.map((domain) => {
      const imgHash = domain?.ipfsImg && JSON.parse(domain?.ipfsImg)?.linkedObject?.storage?.slice(
        2
      );
      return {
        ...domain,
        domainImg: imgHash && `https://gateway.pinata.cloud/ipfs/${imgHash}` || null,
      };
    }),
  };

  return (
    <Table
      data={newAccountDomains}
      config={ScoringConfig}
      isLoading={false}
      currentPage={0}
      pageLimit={50}
      totalElements={accountDomains.totalElements}
      pagesCount={accountDomains.totalPages}
      typeView={typeView}
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

export default AllContent;
