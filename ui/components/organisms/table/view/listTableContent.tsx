import classNames from "classnames";
import style from "../index.module.css";
import Image from "next/image";
import sortIcon from "../img/SortIcon.svg";

import { ORDER_BY, SORT_BY } from "../../../../comman/types";
import getCell from "../templates";
import { interSemiBold } from "@/app/fonts";

type ListTableContent = {
  data: any[];
  handleSort: (value: string) => void;
  configs: any;
  isLoading: boolean;
  showErrorMessage: boolean;
  sortBy: SORT_BY;
  orderBy: ORDER_BY;
};

const ListTableContent = ({
  configs,
  handleSort,
  data,
  isLoading,
  showErrorMessage,
  sortBy,
  orderBy,
}: ListTableContent): JSX.Element => {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          {configs.map(({ headerText, sortBy: configSortBy }) => (
            <th
              key={headerText}
              onClick={() => handleSort(configSortBy)}
              className={classNames(interSemiBold.className, {
                [style.headerCellHover]: configSortBy,
              })}
            >
              {headerText}
              {sortBy === configSortBy && (
                <Image
                  src={sortIcon}
                  alt="sort"
                  className={style.sortIcon}
                  style={{
                    transform:
                      orderBy === ORDER_BY.ASC ? "rotateX(180deg)" : null,
                  }}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      {!isLoading && !showErrorMessage && (
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={index}>
                {configs.map((config, index) => {
                  return <td key={index}>{getCell({ data: item, config })}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default ListTableContent;
