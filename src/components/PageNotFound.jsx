import { Button } from "primereact";
import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/404.png";

const PageNotFound = () => {
  // const bgImage = 'url(../assets/404.png)'

  return (
    <section>
      <div className="pageNotFound">
        <div className="pageNotFound__content">
          <span className="pageNotFound__subheader">Huuuh!</span>
          <h1 className="pageNotFound__header">You are lost</h1>
          <p className="pageNotFound__message">
            Sorry, the path you are trying to reach is not or no longer exist
          </p>
          <Link to="/" className="pageNotFound__redirect">
            <Button
                className="p-button-link"
                label="Home"
                icon="pi pi-arrow-left"
            />
          </Link>
        </div>
        <div
          className="pageNotFound__illustration"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
      </div>
    </section>
  );
};

export default PageNotFound;
