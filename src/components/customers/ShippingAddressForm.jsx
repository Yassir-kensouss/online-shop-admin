import axios from "axios";
import { Divider, InputText, InputTextarea } from "primereact";
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Controller } from "react-hook-form";
import { countryName } from "../../utils/helpers";

const ShippingAddressForm = props => {
  const { control, errors, getFormErrorMessage, selectedCountry, setSelectedCountry } = props;

  return (
    <div>
      <Divider align="left">
        <h3 className="p-tag">Shipping Address</h3>
      </Divider>
      <div className="flex align-items-start gap-3 mt-6">
        <div className="customer-country-address-wrapper">
          <label
            htmlFor="country"
            className={
              errors.country
                ? "p-error w-full mb-2 inline-block"
                : "w-full mb-2 inline-block"
            }
          >
            Country*
          </label>
          <ReactFlagsSelect
            id="country"
            selected={selectedCountry?.countryCode}
            onSelect={code => setSelectedCountry({
              countryCode: code,
              countryName: countryName.of(code)
            })}
            className="flex-1 pb-0 customer-country-address"
            searchable
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className={
              errors.address?.city
                ? "p-error w-full mb-2 inline-block"
                : "w-full mb-2 inline-block"
            }
          >
            City*
          </label>
          <Controller
            name="address.city"
            control={control}
            rules={{
              maxLength: { value: 100, message: "City is too long" },
            }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.city}
                {...field}
                placeholder="Casablanca"
                className={fieldState.invalid ? "p-invalid w-full" : "w-full"}
              />
            )}
          />
          {getFormErrorMessage("city")}
        </div>
      </div>

      <div className="flex align-items-start gap-3 mt-4">
        <div>
          <label
            htmlFor="state"
            className={
              errors.state
                ? "p-error w-full mb-2 inline-block"
                : "w-full mb-2 inline-block"
            }
          >
            State*
          </label>
          <Controller
            name="address.state"
            control={control}
            rules={{
              maxLength: { value: 100, message: "state is too long" },
            }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.state}
                {...field}
                placeholder="casablanca-settat"
                className={fieldState.invalid ? "p-invalid w-full" : "w-full"}
              />
            )}
          />
          {getFormErrorMessage("state")}
        </div>

        <div>
          <label
            htmlFor="zipCode"
            className={
              errors.zipCode
                ? "p-error w-full mb-2 inline-block"
                : "w-full mb-2 inline-block"
            }
          >
            zipCode*
          </label>
          <Controller
            name="address.zipCode"
            control={control}
            rules={{
              maxLength: { value: 50, message: "zipCode is too long" },
            }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.zipCode}
                {...field}
                placeholder="234990"
                className={fieldState.invalid ? "p-invalid w-full" : "w-full"}
              />
            )}
          />
          {getFormErrorMessage("zipcode")}
        </div>
      </div>
    <div className="mt-4">
        <label
        htmlFor="primaryAddress"
        className={errors.primaryAddress ? "p-error w-full mb-2 inline-block" : "w-full mb-2 inline-block"}
        >
        Address*
        </label>
        <Controller
        name="address.primaryAddress"
        control={control}
        render={({ field, fieldState }) => (
            <InputTextarea
            id={field.primaryAddress}
            {...field}
            rules={{
                maxLength: { value: 255, message: "address is too long" },
              }}
            className={fieldState.invalid ? "p-invalid w-full" : "w-full"}
            rows={5}
            cols={30}
            autoResize
            />
        )}
        />
        {getFormErrorMessage("primaryAddress")}
    </div>
    </div>
  );
};

export default ShippingAddressForm;
