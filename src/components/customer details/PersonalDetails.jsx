import React, { useState } from "react";
import { Divider, Image } from "primereact";
import EditCustomerDetails from "../customers/EditCustomerDetails";
import DetailsCards from "../DetailsCards";

const PersonalDetails = props => {
  const { details, customerDetailsQuery } = props;
  const { name, avatar, email, about, address, phone, mobile } = details;
  const [editUserDialog, setEditUserDialog] = useState(false);
  return (
    <DetailsCards>
      <EditCustomerDetails
        editUserDialog={editUserDialog}
        setEditUserDialog={setEditUserDialog}
        customer={details}
        fetchCustomersQuery={customerDetailsQuery}
      />
      <div className="flex gap-4 align-items-start justify-content-between">
        <div className="flex gap-4 align-items-center">
          <Image
            preview
            src={
              avatar
                ? avatar
                : `https://eu.ui-avatars.com/api/?name=${name}&size=250`
            }
            className="customer-details-avatar"
          />
          <div>
            <h3 className="text-xl capitalize font-semibold text-800">
              {name}
            </h3>
            <div className="text-s text-600 mt-2 flex align-items-center gap-2">
              <i className="pi pi-envelope"></i>
              {email}
            </div>
          </div>
        </div>
        <button
          className="w-2rem h-2rem bg-bluegray-50 border-round-md text-bluegray-500"
          onClick={() => setEditUserDialog(true)}
        >
          <i className="pi pi-user-edit"></i>
        </button>
      </div>
      <section>
        <Divider align="left" className="mb-3">
          <span className="p-tag">
            <i className="pi pi-map-marker mr-1"></i>Address
          </span>
        </Divider>
        {address && Object.values(address).some(value => value !== "") ? (
          <address className="customer-details-address">
            <div className="address-value">
              <span className="key">Country: </span>
              <span className="value">
                {address.country !== "" ? address.country : "Not Provided"}
              </span>
            </div>

            <div className="address-value">
              <span className="key">City: </span>
              <span className="value">
                {address.city !== "" ? address.city : "Not Provided"}
              </span>
            </div>

            <div className="address-value">
              <span className="key">State: </span>
              <span className="value">
                {address.state !== "" ? address.state : "Not Provided"}
              </span>
            </div>

            <div className="address-value">
              <span className="key">Zip Code: </span>
              <span className="value">
                {address.zipCode !== "" ? address.zipCode : "Not Provided"}
              </span>
            </div>

            <div className="address-value">
              <span className="key">Address: </span>
              <span className="value">
                {address.address !== "" ? address.address : "Not Provided"}
              </span>
            </div>
          </address>
        ) : (
          <div className="text-sm text-600 ml-4">
            No address provided for the moment!
          </div>
        )}
      </section>

      <section>
        <Divider align="left" className="mb-3">
          <span className="p-tag">
            <i className="pi pi-book mr-1"></i>Contacts
          </span>
        </Divider>
        {phone !== "" || mobile !== "" ? (
          <div className="ml-4 flex align-items-center gap-4">
            {phone && phone !== "" ? (
              <div className="address-value mb-2">
                <span className="key">Phone: </span>
                <span className="value">+{phone}</span>
              </div>
            ) : (
              "Phone not provided"
            )}
            {mobile && mobile !== "" ? (
              <div className="address-value mb-2">
                <span className="key">Mobile: </span>
                <span className="value">+{mobile}</span>
              </div>
            ) : (
              "Mobile not provided"
            )}
          </div>
        ) : (
          <div className="text-sm text-600 ml-4">
            No contacts provided for the moment!
          </div>
        )}
      </section>
    </DetailsCards>
  );
};

export default PersonalDetails;
