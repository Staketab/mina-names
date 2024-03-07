import style from "./index.module.css";
import { ORDER_BY } from "../../../comman/types";
import { TableErrorMessage } from "../../atoms/tableErrorMessage";
import { Loader, LoaderVariant } from "../../atoms/loader";
import { TypeView } from "../../atoms/switchView/switchView";
import NameCards from "./view/nameCards";
import ListTableContent from "./view/listTableContent";
import Pagination from "../pagination/pagination";

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
          <ListTableContent
            data={data?.data}
            configs={configs}
            isLoading={isLoading}
            showErrorMessage={showErrorMessage}
            sortBy={sortBy}
            orderBy={orderBy}
            handleSort={handleSort}
          />
        ) : (
          <NameCards data={data?.data} />
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