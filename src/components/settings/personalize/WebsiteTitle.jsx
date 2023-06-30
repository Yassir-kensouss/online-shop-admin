import { InputText } from "primereact";
import React from "react";

const WebsiteTitle = ({ wTitle, setWTitle, changes, setChanges }) => {
  const handleChange = e => {
    setWTitle(e.target.value);
    setChanges({
      ...changes,
      websiteTitle: e.target.value,
    });
  };

  return (
    <div className="mt-4 w-full">
      <label className="sp-label" htmlFor="website-title">
        <div>Website Description:</div>
        <InputText
          className="w-full mt-2"
          value={wTitle}
          onChange={handleChange}
          id="website-title"
        />
      </label>
    </div>
  );
};

export default WebsiteTitle;
