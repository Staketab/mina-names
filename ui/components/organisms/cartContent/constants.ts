import { TableConfig } from "@/comman/types";
import { TableTemplates } from "../table/templates";
import deleteIcon from "../../../assets/delete.svg";
import { Star } from "@/components/atoms/star";

export const tableConfig: TableConfig[] = [
  {
    colName: "domainName",
    headerText: "Domain Name",
    columnTemplate: TableTemplates.STRING,
    fields: {
      value: "name",
    },
  },
  {
    colName: "periodYears",
    columnTemplate: TableTemplates.COUNTER,
    headerText: "Period / Years",
    fields: {
      value: "years",
      onClick: "onCount",
    },
    style: {
      color: "#7191FC",
    },
  },
  {
    colName: "price",
    columnTemplate: TableTemplates.STRING,
    headerText: "Price",
    fields: {
      value: "amount",
    },
    style: {
      color: "#1A1A1B",
    },
  },
  {
    colName: "delete",
    columnTemplate: TableTemplates.ICON,
    headerText: "",
    fields: {
      onClick: "onClick",
      icon: Star,
    },
    style: {
      color: "#7191FC",
    },
  },
  {
    colName: "delete",
    columnTemplate: TableTemplates.ICON,
    headerText: "",
    fields: {
      onClick: "onClick",
      icon: deleteIcon,
    },
    style: {
      color: "#7191FC",
    },
  },
  //   {
  //     colName: "price",
  //     columnTemplate: TableTemplates.STRING,
  //     headerText: "Price",
  //     fields: {
  //       value: "value",
  //     },
  //     style: {
  //       color: "#7191FC",
  //     },
  //   },
];
