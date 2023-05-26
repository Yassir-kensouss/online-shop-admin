import { Button, Image, Tooltip } from "primereact";
import React from "react";
import { useState } from "react";

const BrandLogoUploader = ({ preview, setPreview }) => {
  const [brandName, setBrandName] = useState("");

  const [changes, setChanges] = useState({});
  const customBase64Uploader = async e => {
    const file = e.target.files[0];

    const avatar = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    avatar
      .then(data => {
        setPreview(data);
        setChanges({
          ...changes,
          brand: data,
        });
      })
      .catch(error => {
        console.log("error", error);
      });
    setBrandName(file.name);
  };

  const clearBrand = () => {
    setPreview(null);
    setBrandName(null);
  };

  return (
    <>
      <div className="flex align-items-start gap-4">
        <label className="sp-label" htmlFor="upload-brand">
          <Tooltip target=".brand-tooltip">
            <p className="w-10rem line-height-2">
              the recommended dimensions are: 50 x 50
            </p>
          </Tooltip>
          <div className="flex align-items-center gap-2">
            <span>Image *:</span>
            <i className="brand-tooltip pi pi-info-circle"></i>
          </div>
          <div>
            <div className="cursor-pointer mt-2 w-10rem h-3rem bg-indigo-50 border-round-md flex gap-3 align-items-center justify-content-start p-2">
              <i className="pi pi-upload text-indigo-800 font-semibold"></i>
              <span className="sp-brand-uploader-label text-sm">
                Click to upload
              </span>
            </div>
            {brandName ? (
              <span className="block mt-2 text-sm text-800">{brandName}</span>
            ) : null}
            <input
              id="upload-brand"
              hidden
              type="file"
              onChange={customBase64Uploader}
            />
          </div>
        </label>
        {preview ? (
          <div className="flex align-items-center gap-2">
            <div className="mt-4 w-8rem">
              <Image
                preview
                width="100%"
                src={preview}
                alt="brand preview"
                title="brand preview"
                className="border-round-xl overflow-hidden"
              />
            </div>
            <Button
              className="mt-4 p-button-text p-button-text p-button-danger p-button-rounded"
              icon="pi pi-trash"
              onClick={clearBrand}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BrandLogoUploader;
