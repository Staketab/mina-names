import { SORT_BY, TableConfig } from "@/comman/types";
import { TableTemplates } from "../table/templates";


export const mockData = {
    data: [
      { record: "Email", value: 'Set' },
      { record: "Discord",value: 'Set' },
      { record: "Github",  value: 'Set' },
      { record: "Reddit", value: 'Set' },
      { record: "X (Twitter)",  value: 'Set' },
      { record: "Telegram",  value: 'Set'},
    ],

  };
  

export const tableConfig: TableConfig[] = [
  {
    colName: "record",
    headerText: "Record",
    columnTemplate: TableTemplates.STRING,
    fields: {
      value: "record",
    },
  },
  {
    colName: "value",
    columnTemplate: TableTemplates.STRING,
    headerText: "Value",
    fields: {
      value: "value",
    },
    style: {
      color: '#7191FC'
    }
  },
];
