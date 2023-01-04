import { Image, Toast } from "primereact";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ImportIcon } from "../../assets/icons";
import { ContextContainer } from "../../pages/NewProduct";
import { isFilesValid } from "../../utils/isFilesValid";

const Photos = () => {
  const toast = useRef(null)
  const { setFiles, files, product, setProduct, errors } = useContext(ContextContainer);

  useEffect(() => {

    setProduct({
      ...product,
      files
    })

  },[files])

  const handleProductPicture = (e) => {
    const files = e.target.files;
    const arr = [...files]
    const {errors, isValid} = isFilesValid(arr)

    if(arr.length > 6){
      toast.current.show({
        severity: "error",
        detail: 'You cannot upload more than 6 pictures',
        life: 2000,
      });
      return false
    }

    if(errors && !isValid){
      let errs = [];
      errors.map(error => {
        errs.push({
          severity: "error",
          detail: error.message,
          life: 2000,
        })
      })
      toast.current.show(errs);
      return false
    }

    setFiles(arr);
  }

  const handleMoreFiles = (e) => {
    const newFiles = e.target.files;
    const arr = [...newFiles];
    const {errors, isValid} = isFilesValid(arr)
    
    if(errors && !isValid){
      let errs = [];
      errors.map(error => {
        errs.push({
          severity: "error",
          detail: error.message,
          life: 2000,
        })
      })
      toast.current.show(errs);
      return false
    }

    const moreFiles = [...files,...arr]

    if(moreFiles && moreFiles.length > 6){
      toast.current.show({
        severity: "error",
        detail: 'You cannot upload more than 6 pictures',
        life: 2000,
      });
      return false
    }

    setFiles(moreFiles)
  }

  const  handleRemove = (file) => {
    const name = file.name;
    const arr = files.filter(file => {
      return file.name !== name
    })
    setFiles(arr)
  }


  return (
    <div className="bg-white p-3 border-round-sm mt-3">
      <Toast ref={toast} />
      <h2 className="text-xl mb-5 font-medium text-800">Pictures *</h2>
      {files && files.length > 0 ? (
        <div className="previewPictures">
          {files.map(file => (
            <div className="previewPictures__item" key={file.name}>
              {/* <img className="previewPictures__img" src={URL.createObjectURL(file)} /> */}
              <Image
                src={URL.createObjectURL(file)}
                alt="Image"
                width="130"
                preview
              />
              <div className="previewPictures__overlay">
                <div
                  className="previewPictures__cancel"
                  onClick={() => handleRemove(file)}
                >
                  Cancel
                </div>
              </div>
            </div>
          ))}
          {files && files.length <= 5 ? (
            <label className="previewPictures__addMore" htmlFor="moreProductPictures">
              <i className="pi pi-plus" aria-hidden='true'></i>
              <input
                type="file"
                multiple
                onChange={handleMoreFiles}
                hidden
                id="moreProductPictures"
              />
            </label>
          ) : null}
        </div>
      ) : (
        <>
          <div className="productPictures">
          <label htmlFor="productPictures">
            <input
              type="file"
              multiple
              onChange={handleProductPicture}
              hidden
              id="productPictures"
            />
            <ImportIcon
              aria-hidden="true"
              className="productPictures_labelIcon"
            />
            <span className="productPictures_label">
              Click To Upload Pictures
            </span>
            <small className="text-xs text-500 mt-2">
              Support JPEG, PNG, WENP, and Up to 2MB
            </small>
          </label>
        </div>
        {
          errors && 'files' in errors ? 
          <p className="text-red-400 mt-2 text-sm">{errors['files']}</p>:null
        }
        </>
      )}
    </div>
  );
};

export default Photos;
