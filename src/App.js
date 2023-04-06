import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Routers from "./Routers";

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId="128474420027-3cmf1ufttlh5ff8nfniebuqjtm4skard.apps.googleusercontent.com">
        <Routers />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
