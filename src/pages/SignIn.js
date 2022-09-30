import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Divider, Toast } from "primereact";
import { Password } from "primereact/password";
import googleIcon from "../assets/icons/google-icon.svg";
import TextInput from "../components/inputs/TextInput";
import CustomButton from "../components/buttons/CustomButton";
import { useMutation } from "react-query";
import { signIn } from "../services/auth";

const SignIn = () => {
  const toast = useRef(null);
  const navigate = useNavigate();

  const [stayLogged, setStayLogged] = useState(false);
  const [userData, setUserData] = useState({});

  const { mutate, isLoading, isError } = useMutation(signIn, {
    onSuccess: (data) => {
      localStorage.setItem("jwt_data", JSON.stringify(data.data));
      return navigate("/");
    },
  });

  const handleCheckbox = (e) => {
    setStayLogged(e.checked);
  };

  const handleInputs = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Somthing went wrong!",
        detail: "Email or password incorrect",
        life: 3000,
      });
    }
  }, [isError]);

  return (
    <>
      <Toast ref={toast} />
      <div className="signIn flex">
        <div className="signIn__content flex-1 flex align-items-center justify-content-center">
          <div className="signIn__form">
            <h3 className="signIn__title">Sign In</h3>
            <h3 className="signIn__description">
              Enter your email and password to sign in!
            </h3>
            <button className="signIn__thirdPartyAuth flex align-items-center justify-content-center w-full">
              <img src={googleIcon} alt="google icon" />
              Sign in with google
            </button>
            <Divider align="center">or</Divider>
            <form>
              <div className="signIn__field">
                <label htmlFor="email">Email *</label>
                <TextInput
                  placeholder="evan-dev@mail.com"
                  id="email"
                  type="email"
                  className="w-full"
                  onBlur={handleInputs}
                />
              </div>

              <div className="signIn__field">
                <label htmlFor="password">Password *</label>
                <Password
                  inputId="password"
                  toggleMask
                  className="p-inputtext-sm custom-password-input"
                  onBlur={handleInputs}
                />
              </div>
              <div className="signIn__forgotPassword flex align-items-center justify-content-between">
                <label
                  htmlFor="stayLoggedIn"
                  className="flex align-items-center gap-2"
                >
                  <Checkbox
                    id="stayLoggedIn"
                    checked={stayLogged}
                    onChange={handleCheckbox}
                  />
                  <small className="inline-block">Keep me logged in</small>
                </label>
                <a>Forgot password?</a>
              </div>
              <CustomButton
                loading={isLoading ? true : false}
                label="Sign In"
                className="w-full mt-3"
                onClick={() => mutate(userData)}
              />
            </form>
          </div>
        </div>
        <div className="signIn__cover flex-1"></div>
      </div>
    </>
  );
};

export default SignIn;
