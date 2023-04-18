import { Button } from "primereact";
import React from "react";

const SettingContentWrapper = ({ children, title, onSubmit, isLoading }) => {
  return (
    <section className="flex flex-column h-full">
      <div className="h-full">
        <h3 className="text-xl font-semibold text-indigo-800 w-full">
          {title}
        </h3>
        {children}
      </div>
      <Button loading={isLoading} onClick={onSubmit} label="Save changes" className="ml-auto w-10rem p-button-primary p-button-sm" />
    </section>
  );
};

export default SettingContentWrapper;
