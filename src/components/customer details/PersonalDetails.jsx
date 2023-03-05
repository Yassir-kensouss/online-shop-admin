import { Divider, Image } from "primereact";
import React from "react";
import DetailsCards from "../DetailsCards";

const PersonalDetails = props => {
  const { details } = props;
  const { name, avatar, email, about } = details;
  return (
    <DetailsCards>
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
          <h3 className="text-xl capitalize font-semibold text-800">{name}</h3>
          <div className="text-s text-600 mt-2 flex align-items-center gap-2">
            <i className="pi pi-envelope"></i>
            {email}
          </div>
        </div>
      </div>
      <section>
        <Divider align="left" className="mb-3">
          <span className="p-tag">
            <i className="pi pi-map-marker mr-1"></i>Address
          </span>
        </Divider>
        <div className="text-sm text-600 ml-4">
          No address provided for the moment!
        </div>
      </section>

      <section>
        <Divider align="left" className="mb-3">
          <span className="p-tag">
            <i className="pi pi-book mr-1"></i>Contacts
          </span>
        </Divider>
        <div className="text-sm text-600 ml-4">
          No contacts provided for the moment!
        </div>
      </section>
    </DetailsCards>
  );
};

export default PersonalDetails;
