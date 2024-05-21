import { LimitOptions, ORDER_BY, SORT_BY, TableConfig } from "@/comman/types";
import { TypeView } from "@/components/atoms/switchView/switchView";

export interface TableProps {
  data: { content?: any[] };
  config: TableConfig[];
  isLoading: boolean;
  currentPage?: number;
  pageLimit?: number;
  totalElements?: number;
  pagesCount?: number;
  sortBy?: SORT_BY;
  orderBy?: ORDER_BY;
  onChangePage?: (value: number) => void;
  limitOptions?: LimitOptions;
  onChangeLimit?: (value: number) => void;
  onChangeSort?: (value: SORT_BY) => void;
  onChangeOrder?: (value: ORDER_BY) => void;
  typeView: TypeView;
  isHiddenPagination?: boolean;
  isHiddenTopPagination?: boolean;
  isHiddenBottomPagination?: boolean;
}
