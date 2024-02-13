import Image from "next/image";
import style from "./index.module.css";
import getCell from "./templates";

import sortIcon from "./img/SortIcon.svg";
import classNames from "classnames";
import { ORDER_BY } from "../../../comman/types";
import { TableErrorMessage } from "../../atoms/tableErrorMessage";
import Pagination from "../pagination/pagination";
import { Loader, LoaderVariant } from "../../atoms/loader";
import { TypeView } from "../../atoms/switchView/switchView";
import { NameCard } from "../../molecules/nameCard";

const Table = ({
  data,
  config: configs,
  isLoading,
  currentPage,
  pageLimit,
  totalElements,
  pagesCount,
  sortBy,
  orderBy,
  onChangePage,
  limitOptions,
  onChangeLimit,
  onChangeSort,
  onChangeOrder,
  typeView,
}) => {
  const handleSort = (sort?: string): void => {
    if (!sort) return;
    if (sort === sortBy) {
      return onChangeOrder(
        orderBy === ORDER_BY.DESC ? ORDER_BY.ASC : ORDER_BY.DESC
      );
    }
    onChangeSort(sort);
    onChangeOrder(undefined);
  };
  const showErrorMessage = !isLoading && (!data || data?.data?.length < 1);

  const renderPagination = () => {
    return (
      <Pagination
        currentPage={currentPage}
        pageLimit={pageLimit}
        totalElements={totalElements}
        pagesCount={pagesCount}
        onChangePage={onChangePage}
        onChangeLimit={onChangeLimit}
        isLoading={isLoading}
        limitOptions={limitOptions}
      />
    );
  };

  return (
    <>
      {renderPagination()}
      <div className={style.wrapper}>
        {typeView === TypeView.LIST ? (
          <table className={style.table}>
            <thead>
              <tr>
                {configs.map(({ headerText, sortBy: configSortBy }) => (
                  <th
                    key={headerText}
                    onClick={() => handleSort(configSortBy)}
                    className={classNames("t-inter-semi-bold", {
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
                {data?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      {configs.map((config, index) => {
                        return (
                          <td key={index}>{getCell({ data: item, config })}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        ) : (
          <div className={style.nameCards}>
            {data?.data.map(({ name, url }, index) => {
              return <NameCard name={name} img={url} key={index}/>;
            })}
          </div>
        )}
      </div>
      {showErrorMessage && <TableErrorMessage />}
      {isLoading ? (
        <div className={style.loadingScreen}>
          <Loader variant={LoaderVariant.CIRCLE} />
        </div>
      ) : (
        <> {renderPagination()}</>
      )}
    </>
  );
};

export default Table;
