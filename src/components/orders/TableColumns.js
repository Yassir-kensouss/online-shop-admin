import React from "react";
import { Badge, Dropdown } from "primereact";
import moment from "moment";
import ClickToCopy from "../../common/ClickToCopy";

export const renderDate = data => {
  return (
    <div title={moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}>
      {moment(data.createdAt).format("MMM Do YY")}
    </div>
  );
};

export const renderStatus = (
  data,
  rowBody,
  statusSelect,
  getStatusQuery,
  changeStatus,
  handleStatusClick
) => {
  let intent = "";
  switch (data.status) {
    case "Not processed":
      intent = "p-badge-grey";
      break;
    case "Processing":
      intent = "p-badge-orange";
      break;
    case "Shipped":
      intent = "p-badge-blue";
      break;
    case "Delivered":
      intent = "p-badge-green";
      break;
    case "Cancelled":
      intent = "p-badge-red";
      break;
    default:
      return;
  }
  return (
    <>
      {statusSelect && rowBody._id === data._id ? (
        <Dropdown
          value={{ name: data.status, code: data.status }}
          options={getStatusQuery?.data}
          onChange={e => changeStatus(e.value)}
          optionLabel="name"
          filter
          showClear
          filterBy="name"
          placeholder="status"
        />
      ) : (
        <Badge
          value={data.status}
          className={`custom-badge ${intent}`}
          severity="success"
          onClick={() => handleStatusClick(data)}
        />
      )}
    </>
  );
};

export const renderAddress = data => {
  return (
    <div className="flex gap-1 align-items-center" title={data.address}>
      <i className="pi pi-map-marker text-indigo-500"></i>
      <ClickToCopy value={data.address} limit="20" showIcon={true} />
    </div>
  );
};

export const renderTransitionID = data => {
  return <ClickToCopy value={data.transaction_id} showIcon={true} />;
};

export const renderCustomer = data => {
    return <div>{data.user.name}</div>;
  };