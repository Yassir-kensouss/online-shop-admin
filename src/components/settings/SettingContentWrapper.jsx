import { Button } from "primereact";
import React from "react";

const SettingContentWrapper = ({ children, title, onSubmit, isLoading }) => {
  return (
    <section className="settings-content-wrapper flex flex-column h-full">
      <div className="h-full">
        <h3 className="scw-title text-xl font-semibold w-full">{title}</h3>
        {children}
      </div>
      <Button
        loading={isLoading}
        onClick={onSubmit}
        label="Save changes"
        className="ml-auto w-10rem p-button-primary p-button-sm"
      />
    </section>
  );
};

export default SettingContentWrapper;
