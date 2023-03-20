import { Skeleton, Toast } from "primereact";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CustomerActivities from "../components/customer details/CustomerActivities";
import PersonalDetails from "../components/customer details/PersonalDetails";
import Dashboard from "../components/Dashboard";
import { getCustomer } from "../services/customers";
const crumbs = [
  { label: "Home", url: "/" },
  { label: "customers", url: "/customers" },
  { label: "details", url: "/customer/details" },
];

const CustomerDetails = () => {

  const toast = useRef(null);
  const {custId} = useParams();

  const customerDetailsQuery = useQuery("customer-details",async () => {
    const response = await getCustomer(custId);
    const customer = await response.data.user
    return customer
  }, { refetchOnWindowFocus: false})

  return (
    <>
      <Dashboard items={crumbs} title="Details">
        <Toast ref={toast} />
        <section className="flex gap-4">
          <div className="flex-1">
            {
              customerDetailsQuery.isSuccess ? 
              <PersonalDetails details={customerDetailsQuery.data} customerDetailsQuery={customerDetailsQuery}/> : <Skeleton width="100%" height="6rem" />
            }
          </div>
          <div className="flex-1">
            {
              customerDetailsQuery.isSuccess ? 
              <CustomerActivities history={customerDetailsQuery.data.history} />:
              <Skeleton width="100%" height="6rem" />
            }
          </div>
        </section>
      </Dashboard>
    </>
  );
};

export default CustomerDetails;
