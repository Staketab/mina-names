import { Table } from "@/components/organisms/table";
import { ScoringConfig } from "../../constants";
import { TypeView } from "@/components/atoms/switchView/switchView";
import { DataTable, ORDER_BY, SORT_BY } from "@/comman/types";

const AllContent = ({
  accountDomains,
  typeView,
  loading,
  page,
  size,
  onSize,
  onPage,
}: {
  accountDomains: DataTable;
  typeView: TypeView;
  loading: boolean;
  onSize: (size: number) => void;
  onPage: (size: number) => void;
  size: number;
  page: number;
}): JSX.Element => {
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
