import {
  Button,
  Image,
  InputText,
  InputTextarea,
  Password,
  ToggleButton,
} from "primereact";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ContactsForm from "./ContactsForm";
import ShippingAddressForm from "./ShippingAddressForm";

const EditDetailsForm = props => {
  const { customer, _updateCustomerDetails } = props;

  const [isAdmin, setIsAdmin] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");

  const defaultValues = {
    name: customer.name,
    email: customer.email,
    password: customer.password,
    about: customer.about,
    state: customer.state,
    address: {
      city: customer.address?.city,
      country: customer.address?.country,
      zipCode: customer.address?.zipCode,
      state: customer.address?.state,
      primaryAddress: customer.address?.address,
    },
    phone: "",
    mobile: "",
  };

  useEffect(() => {
    const role = customer.role === 0 ? false : true;
    setIsAdmin(role);
    setAvatar(customer.avatar);
    setSelectedCountry(customer.address?.country);
    setMobile(customer.mobile);
    setPhone(customer.phone);
  }, [customer]);

  const handleImageChange = e => {
    const file = e.target.files[0];

    const avatar = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    avatar.then(data => {
      setAvatar(data);
    });
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = name => {
    return (
      'address' in errors ? (
        <small className="p-error mt-2 inline-block">
          {errors['address'][name]?.message}
        </small>
      ) : (
        <small className="p-error mt-2 inline-block">
          {errors[name]?.message}
        </small>
      )
    );
  };

  const onSubmit = data => {
    const body = {
      ...data,
      avatar,
      role: isAdmin ? 1 : 0,
      id: customer._id,
      address: {
        country: selectedCountry,
        address: data.address.primaryAddress,
        state: data.address.state,
        zipCode: data.address.zipCode,
        city: data.address.city
      },
      phone: phone ? phone : "",
      mobile: mobile ? mobile : "",
    };
    _updateCustomerDetails.mutate(body);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-fluid"
        autoComplete="off"
      >
        <div className="flex gap-6">
          <div className="add-new-user-dialog flex-1">
            <div className="mb-5">
              <label
                htmlFor="userAvatar"
                className="overflow-hidden relative w-5rem h-5rem border-circle surface-100 inline-block flex align-items-center justify-content-center cursor-pointer"
                title="Upload user image"
              >
                <input
                  hidden
                  type="file"
                  id="userAvatar"
                  onChange={e => handleImageChange(e)}
                />
                <i className="pi pi-upload"></i>
                {avatar ? (
                  <img
                    src={avatar}
                    alt="user avatar"
                    className="absolute top-0 left-0 w-full h-full object-fit-cover"
                  />
                ) : null}
              </label>
            </div>
            <div className="field">
              <label
                htmlFor="name"
                className={errors.name ? "p-error w-full" : "w-full"}
              >
                Name*
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Name is required.",
                  maxLength: { value: 20, message: "Name is too long" },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Invalid entry",
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    autoFocus
                    className={
                      fieldState.invalid ? "p-invalid w-full" : "w-full"
                    }
                  />
                )}
              />
              {getFormErrorMessage("name")}
            </div>
            <div className="field">
              <label
                htmlFor="email"
                className={errors.email ? "p-error w-full" : "w-full"}
              >
                Email*
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Name is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid entry",
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.email}
                    {...field}
                    autoFocus
                    autoComplete="off"
                    className={
                      fieldState.invalid ? "p-invalid w-full" : "w-full"
                    }
                  />
                )}
              />
              {getFormErrorMessage("email")}
            </div>
            <div className="field">
              <label
                htmlFor="password"
                className={errors.password ? "p-error w-full" : "w-full"}
              >
                Password*
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  maxLength: { value: 20, message: "Password is too long" },
                }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.password}
                    {...field}
                    autoFocus
                    className={
                      fieldState.invalid ? "p-invalid w-full" : "w-full"
                    }
                  />
                )}
              />
              {getFormErrorMessage("password")}
            </div>
            <div className="field">
              <label
                htmlFor="about"
                className={errors.about ? "p-error w-full" : "w-full"}
              >
                About*
              </label>
              <Controller
                name="about"
                control={control}
                render={({ field, fieldState }) => (
                  <InputTextarea
                    id={field.password}
                    {...field}
                    autoFocus
                    className={
                      fieldState.invalid ? "p-invalid w-full" : "w-full"
                    }
                    rows={5}
                    cols={30}
                    autoResize
                  />
                )}
              />
              {getFormErrorMessage("about")}
            </div>
            <div className="field">
              <label htmlFor="about" className="w-full">
                Role
              </label>
              <ToggleButton
                checked={isAdmin}
                onChange={e => setIsAdmin(e.value)}
                onLabel="Admin"
                offLabel="Customer"
                onIcon="pi pi-verified"
                offIcon="pi pi-user"
                style={{ width: "8em" }}
                aria-label="account role"
              />
            </div>
          </div>
          <div className="flex-1">
            <ShippingAddressForm
              control={control}
              errors={errors}
              getFormErrorMessage={getFormErrorMessage}
              selectedCountry={selectedCountry} 
              setSelectedCountry={setSelectedCountry}
            />
            <ContactsForm setPhone={setPhone} setMobile={setMobile} phone={phone} mobile={mobile} />
          </div>
        </div>
        <Button
          label="Save changes"
          type="submit"
          loading={_updateCustomerDetails.isLoading}
          className="p-button-secondary mt-7 w-auto flex self ml-auto"
        />
      </form>
    </div>
  );
};

export default EditDetailsForm;
