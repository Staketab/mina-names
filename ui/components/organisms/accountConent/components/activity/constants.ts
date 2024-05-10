import { SORT_BY, TableConfig } from "@/comman/types";
import { TableTemplates } from "@/components/organisms/table/templates";

export const activitiesConfig: TableConfig[] = [
  {
    colName: "DomainName",
    headerText: "Domain Name",
    columnTemplate: TableTemplates.STRING,
    fields: {
      value: "domainName",
    },
    style: {
      fontSize: '16px',
      maxWidth: '200px'
    }
  },
  {
    colName: "Activity",
    headerText: "Activity",
    columnTemplate: TableTemplates.STRING,
    fields: {
      value: "activity",
    },
    style: {
      maxWidth: '200px'
    }
  },
  {
    colName: "names",
    headerText: "Details",
    columnTemplate: TableTemplates.STRING,
    fields: {
      value: "details",
    },
    style: {
      maxWidth: '200px'
    }
  },
  {
    colName: "Time",
    columnTemplate: TableTemplates.TIME,
    headerText: "Time",
    fields: {
      value: "timestamp",
    },
    sortBy: SORT_BY.AMOUNT,
  },
  {
    colName: "TxHash",
    columnTemplate: TableTemplates.NAMES,
    headerText: "Tx Hash",
    fields: {
      value: "transaction",
    },
    hiddenImg: true,
    style: {
      color: '#1A1A1B'
    }
  },
];
