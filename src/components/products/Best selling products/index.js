import { Button, OverlayPanel, Slider } from "primereact";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { PRODUCT_DATATABLE_LIMIT } from "../../../common/constants";
import { bestSellingProducts } from "../../../services/product";
import DashCards from "../../DashCards";
import BestSellingProducts from "./BestSellingProducts";
import BSPSkeleton from "./BSPSkeleton";

const BSP = () => {
  const [price, setPrice] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const bspMutation = useQuery(["best-selling-products",{page: page}], async () => {
    const response = await bestSellingProducts(
      page,
      PRODUCT_DATATABLE_LIMIT,
      price
    );
    setProducts(response.data.products);
    setTotal(response.data.total);
  },{refetchOnWindowFocus:false});

  const handleBspFilters = () => {
    setPage(0)
    bspMutation.refetch();
  };

  const clearFilter = () => {
    setPage(0)
    bspMutation.refetch();
  };

  return (
    <>
      {bspMutation.isLoading ? (
        <BSPSkeleton />
      ) : (
        <DashCards
          title="Best selling products"
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
        className="p-button-rounded p-button-text p-button-plain"
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
