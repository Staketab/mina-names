import style from "./index.module.css";
import { ORDER_BY, SORT_BY } from "../../../comman/types";
import { TableErrorMessage } from "../../atoms/tableErrorMessage";
import { Loader, LoaderVariant } from "../../atoms/loader";
import { TypeView } from "../../atoms/switchView/switchView";
import NameCards from "./view/nameCards";
import ListTableContent from "./view/listTableContent";
import Pagination from "../pagination/pagination";
import { TableProps } from "./types";

const Table = ({
  data,
  config,
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
  isHiddenPagination,
}: TableProps): JSX.Element => {
  
  const handleSort = (sort?: SORT_BY): void => {
    if (!sort) return;
    if (sort === sortBy) {
      return onChangeOrder(
        orderBy === ORDER_BY.DESC ? ORDER_BY.ASC : ORDER_BY.DESC
      );
    }
    onChangeSort(sort);
    onChangeOrder(undefined);
  };
  const showErrorMessage = !isLoading && (!data || data?.content?.length < 1);

  const renderPagination = () => {
    if (isHiddenPagination) return null;
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
            data={data?.content}
            configs={config}
            isLoading={isLoading}
            showErrorMessage={showErrorMessage}
            sortBy={sortBy}
            orderBy={orderBy}
            handleSort={handleSort}
          />
        ) : (
          <NameCards data={data?.content} />
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
