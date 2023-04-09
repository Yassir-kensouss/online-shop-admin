import { Button, Calendar, OverlayPanel, Slider } from "primereact";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { PRODUCT_DATATABLE_LIMIT } from "../../../common/constants";
import { bestSellingProducts } from "../../../services/product";
import DashCards from "../../DashCards";
import BestSellingProducts from "./BestSellingProducts";

const BSP = () => {
  const [price, setPrice] = useState([20, 80]);
  const [filters, setFilters] = useState({});

  const bspMutation = useMutation(data => bestSellingProducts(data));

  const handleBspFilters = () => {
    const _filters = {
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    };
    setFilters(_filters);
    bspMutation.mutate({
      page: 0,
      limit: PRODUCT_DATATABLE_LIMIT,
      filters: _filters,
    });
  };

  const clearFilter = () => {
    bspMutation.mutate({page: 0, limit: PRODUCT_DATATABLE_LIMIT, filters: {}})
  }

  return (
    <>
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
        <BestSellingProducts bspMutation={bspMutation} filters={filters} />
      </DashCards>
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
          <Button className="p-button-sm mt-5 p-button-outlined p-button-secondary" onClick={clearFilter}>
            Clear
          </Button>
        </div>
      </OverlayPanel>
    </>
  );
};
