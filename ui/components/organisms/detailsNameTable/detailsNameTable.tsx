import { TypeView } from "@/components/atoms/switchView/switchView";
import { Table } from "../table";
import { mockData, tableConfig } from "./constants";
import { SubHeader } from "@/components/atoms/subHeader";

import style from './index.module.css'

const DetailsNameTable = () => {
  return (
    <div className={style.wrapper}>
      <SubHeader header='Records' className={style.subHeader}/>
      <Table
        data={mockData}
        config={tableConfig}
        isLoading={false}
        typeView={TypeView.LIST}
        isHiddenPagination
      />
    </div>
  );
};

export default DetailsNameTable;
