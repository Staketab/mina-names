import { SORT_BY } from "../../../comman/types";
import { TableTemplates } from "../table/templates";
import iconMock from "./img/iconMock.svg";

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

export const mockData = {
  data: [
    { id: "Evgeniy-dev.mina", url: iconMock, time: 1707757181674 },
    { id: "mina.mina", url: iconMock, time: 1707757181674 },
    { id: "Evgeniy-dev.mina", url: iconMock, time: 1707757181674 },
    { id: "mina.mina", url: iconMock, time: 1707757181674 },
    { id: "Evgeniy-dev.mina", url: iconMock, time: 1707757181674 },
    { id: "Vitality.mina", url: iconMock, time: 1707757181674 },
    { id: "@@@@@@@.mina", url: iconMock, time: 1707757181674 },
  ],
  size: 100,
  totalPages: 1,
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 100,
    paged: true,
    unpaged: false,
  },
  last: false,
  totalElements: 2,
  number: 0,
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },
  first: true,
  numberOfElements: 100,
  empty: false,
};
