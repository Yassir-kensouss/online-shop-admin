import { Button, Dropdown, InputText } from "primereact";
import React from "react";

const TableHeader = props => {
  const {
    searchValue,
    searchOrderEvent,
    handleCustomer,
    field,
    fields,
    setField,
    initFilters,
  } = props;
  return (
    <>
      <div className="flex justify-content-between">
        <span className="p-input-icon-left flex align-items-center gap-2">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={searchValue}
            onKeyDown={searchOrderEvent}
            placeholder="Global Search"
            onChange={handleCustomer}
            disabled={field ? false : true}
            className="p-inputtext-sm"
          />
          <Dropdown
            optionLabel="name"
            value={field}
            options={fields}
            onChange={e => setField(e.value)}
            placeholder="Select a field"
            title="search by"
          />
        </span>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined p-button-sm"
          onClick={initFilters}
        />
      </div>
    </>
  );
};

export default TableHeader;
