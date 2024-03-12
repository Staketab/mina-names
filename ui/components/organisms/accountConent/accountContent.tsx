"use client";
import { useState } from "react";
import { SwitchView } from "../../atoms/switchView";
import { TypeView } from "../../atoms/switchView/switchView";
import { ConnectWalletButton } from "../../molecules/connectWalletButton";
import { Table } from "../table";
import { ScoringConfig, mockData } from "./constants";
import style from "./index.module.css";
import { interSemiBold } from "@/app/fonts";

const AccountContent = () => {
  const [typeView, setTypeView] = useState<TypeView>(TypeView.CARD);
  const handleSwitchView = (typeView: TypeView) => {
    setTypeView(typeView);
  };

  return (
    <div>
      <div className={style.header}>
        <div className={interSemiBold.className}>My Names</div>
        <ConnectWalletButton />
      </div>
      <SwitchView onClick={handleSwitchView} className={style.switchView} />
      <Table
        data={mockData}
        config={ScoringConfig}
        isLoading={false}
        currentPage={0}
        pageLimit={50}
        totalElements={mockData.totalElements}
        pagesCount={mockData.totalPages}
        typeView={typeView}
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
