import { Tooltip } from "primereact";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { CSVIcon, ImportIcon } from "../../assets/icons";
import { persistManyCategories } from "../../services/category";

const tooltipStyles = {
  width: "12em",
  fontSize: "14px",
  lineHeight: "1.35",
};

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}

const AddMany = props => {
  const { setHasFile,setCsvFile, setError } = props;

  const [file, setFile] = useState(null);
  

  const onUpload = e => {
    const { size, type } = e.target.files[0];
    if (e.target.files) {
      console.log("first", size, type);
      if (size > 2097152) {
        setError("File is too large, maximum size allowed is 2MB");
        return;
      } else if (type.split("/")[1] !== "csv") {
        setError("File not allowed");
        return;
      } else {
        setError("");
      }

      setFile(e.target.files[0]);
      setCsvFile(e.target.files[0])
      setHasFile(true);
    }
  };

  return (
    <div className="cUploader">
        {file ? (
          <div
            className="filePreview"
            onClick={() => {
              setFile(null);
              setHasFile(false);
              setError(false)
            }}
          >
            <div className="filePreview__removeFile">
              <span
                aria-label="remove file"
                className="filePreview__removeFileBtn"
              >
                <i className="pi pi-times" aria-hidden="true"></i>
              </span>
            </div>
            <CSVIcon className="filePreview__icon" />
            <div>
              <small className="filePreview__name">{file.name}</small>
              <small className="filePreview__size">
                {formatSizeUnits(file.size)}
              </small>
            </div>
          </div>
        ) : (
          <>
            <label
              htmlFor="categories"
              className="cUploader_label"
              id="categories-multi-upload"
            >
              <ImportIcon aria-hidden="true" className="cUploader_labelIcon" />
              <span className="cUploader_labelText">import .CSV file</span>
              <input
                type="file"
                accept=".csv"
                id="categories"
                hidden
                onChange={onUpload}
              />
            </label>
          </>
        )}
    </div>
  );
};

export default AddMany;
