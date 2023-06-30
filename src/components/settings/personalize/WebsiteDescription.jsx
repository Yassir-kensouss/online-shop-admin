import { InputTextarea } from "primereact";
import React from "react";

const WebsiteDescription = ({
  wDescription,
  setWDescription,
  changes,
  setChanges,
}) => {
  const handleChange = e => {
    setWDescription(e.target.value);
    setChanges({
      ...changes,
      websiteDescription: e.target.value,
    });
  };

  return (
    <div className="mt-4 w-full">
      <label className="sp-label" htmlFor="website-description">
        <div>Website Description:</div>
        <InputTextarea
          className="w-full mt-2"
          value={wDescription}
          onChange={handleChange}
          rows={5}
          cols={10}
          id="website-description"
        />
      </label>
    </div>
  );
};

export default WebsiteDescription;
