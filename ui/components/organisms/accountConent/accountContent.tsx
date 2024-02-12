import { ORDER_BY, SORT_BY } from "../../../comman/types";
import { useTable } from "../../../hooks/useTable";
import { ConnectWalletButton } from "../../molecules/connectWalletButton";
import { Table } from "../table";
import { ScoringConfig } from "./constants";
import iconMock from "./img/iconMock.svg";
import style from "./index.module.css";

const AccountContent = () => {
  const mockData = {
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
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className="t-inter-semi-bold">My Names</div>
        <ConnectWalletButton />
      </div>
      <Table
        data={mockData}
        config={ScoringConfig}
        isLoading={false}
        currentPage={0}
        pageLimit={50}
        totalElements={mockData.totalElements}
        pagesCount={mockData.totalPages}
        limitOptions={[
          { text: "10", value: 10 },
          { text: "50", value: 50 },
          { text: "100", value: 100 },
        ]}
        sortBy={"sortBy"}
        orderBy={"orderBy"}
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
    </div>
  );
};

export default AccountContent;
