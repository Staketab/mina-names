import { Table } from "@/components/organisms/table";
import { ScoringConfig } from "../../constants";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { DataTable, ORDER_BY, SORT_BY } from "@/comman/types";

const AllContent = ({
  accountDomains,
  typeView,
  loading,
}: {
  accountDomains: DataTable;
  typeView: TypeView;
  loading: boolean;
}): JSX.Element => {
  
  return (
    <Table
      data={accountDomains}
      config={ScoringConfig}
      isLoading={loading}
      currentPage={0}
      pageLimit={50}
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
