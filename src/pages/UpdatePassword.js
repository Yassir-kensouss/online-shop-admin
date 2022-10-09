import React from "react";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../components/buttons/CustomButton";
import { useMutation } from "react-query";
import { updatePassword } from "../services/auth";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { mutate, isError, error, isLoading, isSuccess } =
    useMutation(updatePassword);

  let { userId, token } = useParams();

  const onSubmit = (data) => {
    const url = {
      userId,
      token,
      data,
    };
    mutate(url);
  };

  return (
    <>
      <div className={"signIn flex"}>
        <div className="signIn__content flex-1 flex align-items-center justify-content-center">
          <div className="signIn__form">
            {isSuccess && (
              <i className="signIn__titleIcon pi pi-check text-2xl text-green-200 text-green-700 mb-3"></i>
            )}
            <div className="signIn__title flex align-items-center">
              {isSuccess ? (
                <h3>Your password has been successfully reset</h3>
              ) : (
                <h3>Rest Password</h3>
              )}

              {!isSuccess && (
                <>
                  <i
                    className="pi pi-info-circle reset-password-note"
                    data-pr-tooltip="For a strong password, please add both lower and uppercase characters and include at least one number or symbol"
                    data-pr-position="right"
                    data-pr-at="right+5 center"
                  ></i>
                  <Tooltip
                    target=".reset-password-note"
                    className="w-16rem line-height-2"
                  />
                </>
              )}
            </div>
            {isSuccess ? (
              <div
                className={
                  isSuccess ? "items-start gap-2" : "flex items-start gap-2"
                }
              >
                {!isSuccess && (
                  <p className="signIn__description mb-4">
                    Reset link was sent to your emailbox to reset your password,
                    Please make sure to add a new strong password
                  </p>
                )}
                <Link to="/sign-in">Login to your account</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="signIn__field">
                  <label htmlFor="new-password">New Paasword *</label>
                  <div className="mb-4">
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Password is required.",
                        },
                        maxLength: {
                          value: 20,
                          message: "Password is too long",
                        },
                        minLength: {
                          value: 6,
                          message: "passowrd must be between 6 and 20",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className={`w-full ${
                            fieldState.invalid ? "p-invalid" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="mt-2 text-red-300 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <label htmlFor="confirmPassword">
                    Confirm New Paasword *
                  </label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Password not match";
                        }
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={`w-full ${
                          fieldState.invalid ? "p-invalid" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-red-300 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {isError && (
                    <p className="mt-2 text-red-300 text-sm">
                      {error.response.data}
                    </p>
                  )}
                </div>
                <CustomButton
                  loading={isLoading ? true : false}
                  label="Save Password"
                  className="w-full mt-0"
                />
              </form>
            )}
          </div>
        </div>
        <div className="signIn__cover flex-1"></div>
      </div>
    </>
  );
};

export default ResetPassword;
