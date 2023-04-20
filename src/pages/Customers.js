import { ConfirmDialog, Toast } from "primereact";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { PRODUCT_DATATABLE_LIMIT } from "../common/constants";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import {
  customersList,
  deleteManyCustomers,
  fetchAllCustomers,
  getCustomer,
} from "../services/customers";
import CustomersTable from "../components/customers/CustomersTable";
import CreateNewUser from "../components/customers/CreateNewUser";
import EditCustomerDetails from "../components/customers/EditCustomerDetails";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "customers", url: "/customers" },
];

const Customers = () => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [confirmDelete, setConformDelete] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [newUserDialog, setNewUserDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [customer, setCustomer] = useState({});

  const toast = useRef(null);

  const editCustomer = async id => {
    const _getCustomer = await getCustomer(id);
    const result = await _getCustomer.data.user;

    if (_getCustomer.status === 200) {
      setEditUserDialog(true);
    }

    setCustomer(result);
  };

  const deleteMany = useMutation(ids => deleteManyCustomers(ids), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "Customer deleted",
        life: 3000,
      });
      fetchCustomersQuery.refetch();
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const fetchCustomersQuery = useQuery(
    ["fetchCustomers", page],
    async () => {
      const response = await fetchAllCustomers(page, PRODUCT_DATATABLE_LIMIT);
      const data = await response.data;
      const customers = await data.customers;
      setTotal(data.count);
      setCustomers(customers);
      return customers;
    },
    { refetchOnWindowFocus: false }
  );

  const searchCustomersByName = useQuery(
    ["search-customer-by-name", page],
    async () => {
      const result = await customersList(
        searchValue,
        page,
        PRODUCT_DATATABLE_LIMIT
      );
      const data = result.data;
      setCustomers(data.customers);
      setTotal(data.count);
      return data;
    },
    { enabled: false }
  );

  const handleCustomer = e => {
    if (e.target.value === "") {
      fetchCustomersQuery.refetch();
    }
    setSearchValue(e.target.value);
  };

  const deleteCustomers = () => {
    let ids = [];

    selectedCustomers?.map(el => {
      ids.push(el._id);
    });

    deleteMany.mutate(ids);
  };

  const handlePageChange = e => {
    setPage(e.page);
    fetchCustomersQuery.refetch();
  };

  return (
    <>
      {newUserDialog ? (
        <CreateNewUser
          newUserDialog={newUserDialog}
          setNewUserDialog={setNewUserDialog}
          fetchCustomersQuery={fetchCustomersQuery}
        />
      ) : null}

      <EditCustomerDetails
        editUserDialog={editUserDialog}
        setEditUserDialog={setEditUserDialog}
        customer={customer}
        fetchCustomersQuery={fetchCustomersQuery}
      />

      <Dashboard
        items={crumbs}
        title="Customers"
        rightElement={
          <>
            <CustomButton
              onClick={() => fetchCustomersQuery.refetch()}
              className="refetch-table p-button-secondary "
              icon="pi pi-refresh"
              disabled={fetchCustomersQuery.isLoading}
              id="refreshCustomersTable"
              aria-label="refresh customers table"
            />
            <CustomButton
              onClick={() => setConformDelete(true)}
              className="p-button-danger"
              icon="pi pi-trash"
              disabled={!selectedCustomers || !selectedCustomers.length > 0}
              id="deleteCustomers"
              aria-label="delete customers"
            />
            <CustomButton
              label="New Customer"
              icon="pi pi-plus"
              onClick={() => setNewUserDialog(true)}
            />
          </>
        }
      >
        <Toast ref={toast} />
        <ConfirmDialog
          visible={confirmDelete}
          onHide={() => setConformDelete(false)}
          message="Are you sure you want to proceed?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={deleteCustomers}
          reject={() => setConformDelete(false)}
        />
        <CustomersTable
          selectedCustomers={selectedCustomers}
          setSelectedCustomers={setSelectedCustomers}
          customers={customers}
          setCustomers={setCustomers}
          fetchCustomersQuery={fetchCustomersQuery}
          searchCustomersByName={searchCustomersByName}
          total={total}
          page={page}
          limit={PRODUCT_DATATABLE_LIMIT}
          handlePageChange={handlePageChange}
          handleCustomer={handleCustomer}
          searchValue={searchValue}
          editCustomer={editCustomer}
        />
      </Dashboard>
    </>
  );
};

export default Customers;
