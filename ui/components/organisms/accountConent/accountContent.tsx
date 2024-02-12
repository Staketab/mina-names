import { ConnectWalletButton } from "../../molecules/connectWalletButton";
import { Table } from "../table";
import { ScoringConfig, mockData } from "./constants";
import style from "./index.module.css";

const AccountContent = () => {
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
