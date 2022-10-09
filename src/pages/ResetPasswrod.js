import React, { useState } from "react";
import TextInput from "../components/inputs/TextInput";
import CustomButton from "../components/buttons/CustomButton";
import { useMutation } from "react-query";
import { passwordReset } from "../services/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("null");

  const { mutate, isError, error, isLoading, isSuccess } =
    useMutation(passwordReset);

  const handleInputValue = (e) => {
    setEmail({ [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="signIn flex">
        <div className="signIn__content flex-1 flex align-items-center justify-content-center">
          <div className="signIn__form">
            <h3 className="signIn__title">
              {isSuccess && (
                <i className="pi pi-check text-2xl text-green-200 signIn__titleIcon text-green-700"></i>
              )}
              Reset Password
            </h3>

            {isSuccess ? (
              <div className="flex items-start gap-2">
                <p className="signIn__description mb-4">
                  Reset link was sent to your emailbox to reset your password,
                  Please make sure to add a new strong password
                </p>
              </div>
            ) : (
              <>
                <div className="signIn__field">
                  <label htmlFor="email">Email *</label>
                  <TextInput
                    placeholder="evan-dev@mail.com"
                    id="email"
                    type="email"
                    className="w-full"
                    onBlur={handleInputValue}
                  />
                  {isError && (
                    <p className="mt-2 text-red-300 text-sm">
                      {error.response.data}
                    </p>
                  )}
                </div>
                <CustomButton
                  loading={isLoading ? true : false}
                  label="Sign In"
                  className="w-full mt-0"
                  onClick={() => mutate(email)}
                />
              </>
            )}
          </div>
        </div>
        <div className="signIn__cover flex-1"></div>
      </div>
    </>
  );
};

export default ResetPassword;
