import { SORT_BY } from "../../../comman/types";
import { TableTemplates } from "../table/templates";

export const ScoringConfig = [
  {
    colName: "names",
    headerText: "Registered Names",
    columnTemplate: TableTemplates.NAMES,
    fields: {
      value: "id",
      url: "url",
    },
  },
  {
    colName: "button",
    columnTemplate: TableTemplates.BUTTON,
    headerText: "",
    fields: {
      value: "Manage",
    },
  },
  {
    colName: "Created",
    columnTemplate: TableTemplates.TIME,
    headerText: "Created",
    fields: {
      value: "time",
    },
    sortBy: SORT_BY.SCORE,
  },
];
