import moment from "moment";
import { Badge, Button, Column, DataTable, Dropdown, Menu, Sidebar } from "primereact";
import React, { useEffect, useRef, useState } from "react";
import ClickToCopy from "../../common/ClickToCopy";
import { shortenString } from "../../utils/helpers";
import OrderCustomerDetails from "./OrderCustomerDetails";
import OrderProducts from "./OrderProducts";

const OrdersTable = props => {
  const { orders, getStatusQuery, changeStatusQuery, ordersQuery } = props;

  const menu = useRef(null);

  const [rowBody, setRowBody] = useState(null);
  const [visible, setVisible] = useState(false);
  const [statusSelect,setStatusSelect] = useState(false)

  const renderDate = data => {
    return (
        <div title={moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>
            {moment(data.createdAt).format("MMM Do YY")}
        </div>
    );
  };

const handleStatusClick = (data) => {
  setStatusSelect(true);
  setRowBody(data);
};

useEffect(() => {

    if(changeStatusQuery.isSuccess) {
        setStatusSelect(false);
        ordersQuery.refetch()
    }

},[changeStatusQuery.isSuccess])

const changeStatus = (value) => {
    changeStatusQuery.mutate({_id: rowBody._id, body: value.name});
}

  const renderStatus = data => {
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
            value={{name: data.status, code: data.status}}
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

  const renderAddress = data => {
    return (
      <div className="flex gap-1 align-items-center" title={data.address}>
        <i className="pi pi-map-marker text-indigo-500"></i>
        <ClickToCopy value={data.address} limit="20" showIcon={true} />
      </div>
    );
  };

  const renderTransitionID = (data) => {
    return (
        <ClickToCopy value={data.transaction_id} showIcon={true} />
    )
  }

  const renderActions = data => {
    let items = [
      {
        label: "More details",
        icon: "pi pi-eye",
        command: () => setVisible(true),
      },
      {
        label: "Update state",
        icon: "pi pi-eye",
        command: () => setVisible(true),
      },
    ];

    return (
      <>
        <Menu model={items} popup ref={menu} id="popup_menu" />
        <Button
          icon="pi pi-ellipsis-v"
          onClick={event => {
            menu.current.toggle(event);
            setRowBody(data);
          }}
          aria-controls="popup_menu"
          aria-haspopup
          className=" p-button-rounded p-button-secondary p-button-text p-button-sm table-btn-icon"
        />
      </>
    );
  };

  const renderCustomer = (data) => {
    return (
        <div>
            {data.user.name}
        </div>
    )
  }

  return (
    <div>
      <Sidebar
        style={{ width: "500px" }}
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <OrderProducts order={rowBody} />
        <OrderCustomerDetails order={rowBody} />
      </Sidebar>
      <DataTable
        value={orders}
        responsiveLayout="scroll"
        emptyMessage="No products found."
        stripedRows
      >
        <Column field="transaction_id" header="Transaction ID" body={(data) => renderTransitionID(data)} />
        <Column header="Customer" body={(data) => renderCustomer(data)} />
        <Column
          field="address"
          header="Delivery Place"
          body={data => renderAddress(data)}
        />
        <Column
          field="createdAt"
          header="Date"
          body={data => renderDate(data)}
        />
        <Column field="totalPrice" header="Total Price" />
        <Column
          field="status"
          header="Status"
          body={data => renderStatus(data)}
        />
        <Column
          header="Details"
          body={data => renderActions(data)}
          exportable={false}
          style={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default OrdersTable;
