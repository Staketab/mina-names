import { TableTemplates } from "@/components/organisms/table/templates";

export type View = {
  sm: number;
  md: number;
  lg: number;
};
export type LimitOptions = { text: string; value: number }[];
export type TabSwitcherOptions = string[];

export interface DataTable {
  data?: any[];
  content?: any[];
  size: number;
  totalPages: number;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type TableConfig = {
  colName: string;
  headerText: string;
  columnTemplate: TableTemplates;
  fields: {
    value?: string;
    url?: string;
    tooltipFromData?: string;
    tooltipText?: string;
    func?: (value: string) => void;
    prefix?: string;
    postfix?: string;
    additionValue?: string;
  };
  sortBy?: SORT_BY;
  style?: {
    color?: string;
  }
};

export enum SORT_BY {
  AMOUNT = "amount",
  STATUS = "status",
  RESERVATION_TIMESTAMP = "RESERVATION_TIMESTAMP",
  IS_SEND_TO_CLOUD_WORKER = "IS_SEND_TO_CLOUD_WORKER",
}

export enum ORDER_BY {
  DESC = "DESC",
  ASC = "ASC",
}

export enum DATA_STATUS {
  INITIAL = "initial",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export enum DOMAINS_STATUS {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
}
