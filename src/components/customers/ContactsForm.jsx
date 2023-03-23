import { Divider } from "primereact";
import React, {useState} from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const ContactsForm = props => {
  const {phone, setPhone, mobile, setMobile} = props;

  return (
    <div>
      <Divider align="left">
        <h3 className="p-tag">Contacts</h3>
      </Divider>

      <div className="mt-6">
        <label
          htmlFor="country"
          className="w-full mb-2 inline-block"
        >
          Phone*
        </label>

        <PhoneInput
          country={"us"}
          value={phone}
          onChange={phone => setPhone(phone)}
          inputStyle={{
            width: '100%'
          }}
          containerStyle={{
            marginTop: '4px'
          }}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="country"
          className="w-full mb-2 inline-block"
        >
          Mobile*
        </label>

        <PhoneInput
          country={"us"}
          value={mobile}
          onChange={mobile => setMobile(mobile)}
          inputStyle={{
            width: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default ContactsForm;
