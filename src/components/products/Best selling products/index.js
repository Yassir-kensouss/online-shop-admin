import { Button, OverlayPanel, Slider } from "primereact";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { PRODUCT_DATATABLE_LIMIT } from "../../../common/constants";
import { bestSellingProducts } from "../../../services/product";
import DashCards from "../../DashCards";
import BestSellingProducts from "./BestSellingProducts";
import BSPSkeleton from "./BSPSkeleton";

const BSP = () => {
  const [price, setPrice] = useState([0, 1000]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [hasFilter, setHasFilter] = useState(false);

  const bspMutation = useQuery(
    ["best-selling-products", { page: page, hasFilter: hasFilter }],
    async () => {
      const response = await bestSellingProducts(
        page,
        PRODUCT_DATATABLE_LIMIT,
        price,
        hasFilter
      );
      setProducts(response.data.products);
      setTotal(response.data.total);
    },
    { refetchOnWindowFocus: false }
  );

  const handleBspFilters = () => {
    setHasFilter(true);
    setPage(0);
    bspMutation.refetch();
  };

  const clearFilter = () => {
    setHasFilter(false);
    setPage(0);
    bspMutation.refetch();
  };

  return (
    <>
      {bspMutation.isLoading ? (
        <BSPSkeleton />
      ) : (
        <DashCards
          id="best-selling-products"
          title="Best selling products"
          hasInfo={true}
          height="80%"
          infoContent="This report provides an overview of the top-selling products ranked by their frequency of sales."
          rightContent={
            <BSPCalendar
              price={price}
              setPrice={setPrice}
              handleBspFilters={handleBspFilters}
              clearFilter={clearFilter}
            />
          }
        >
          <BestSellingProducts
            products={products}
            total={total}
            refetch={bspMutation.refetch}
            setPage={setPage}
            page={page}
          />
        </DashCards>
      )}
    </>
  );
};

export default BSP;

const BSPCalendar = ({ price, setPrice, handleBspFilters, clearFilter }) => {
  const op = useRef();
  return (
    <>
      <Button
        icon="pi pi-filter"
        style={{ transform: "scale(0.8)" }}
        className="dashCard__filter p-button-rounded p-button-text"
        onClick={e => op.current.toggle(e)}
        aria-label="Filter"
      />
      <OverlayPanel
        className="w-15rem"
        ref={op}
        id="overlay_panel"
        showCloseIcon={false}
        dismissable
      >
        <label htmlFor="price">
          Price: {price[0]} - {price[1]}
        </label>
        <Slider
          className="mt-3"
          id="price"
          value={price}
          onChange={e => setPrice(e.value)}
          range
          min={0}
          max={1000}
        />
        <div className="flex justify-content-between">
          <Button className="p-button-sm mt-5" onClick={handleBspFilters}>
            Filter
          </Button>
          <Button
            className="p-button-sm mt-5 p-button-outlined p-button-secondary"
            onClick={clearFilter}
          >
            Clear
          </Button>
        </div>
      </OverlayPanel>
    </>
  );
};
