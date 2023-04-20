import { Image, Toast } from "primereact";
import React, { useCallback, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FILE_FORMATS, FILE_SIZE } from "../../common/constants";

const Photos = props => {
  const toast = useRef(null);
  const { setFiles, files, product, setProduct, errors } = props;
  const [fileErrors, setFileErrors] = useState(null);

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      let images = [];
      product.photos?.map(photo => {
        images.push(photo);
      });

      resolve(images);
    });

    promise.then(res => setFiles(res));
  }, []);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      fileRejections.forEach(file => {
        file.errors.forEach(err => {
          if (err.code === "file-too-large") {
            setFileErrors({
              hasError: true,
              message: "File is larger than 2MB",
            });
          }

          if (err.code === "too-many-files") {
            setFileErrors({
              hasError: true,
              message: "Too many files, Maximum you can upload is 6",
            });
          }

          if (err.code === "file-invalid-type") {
            setFileErrors({
              hasError: true,
              message:
                "Error: Invalid media type (png, jpg, jpeg, webp) only allowed",
            });
          }
        });
      });
    } else {
      setFileErrors(null);
    }

    const filesArray = Array.from(acceptedFiles);

    filesArray.forEach((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFiles(oldData => [...oldData, { url: reader.result }]);
      };
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 6,
    maxSize: FILE_SIZE.IMAGE,
    accept: {
      "image/*": FILE_FORMATS.IMAGE,
      "video/*": FILE_FORMATS.VIDEO,
    },
  });

  useEffect(() => {
    setProduct({
      ...product,
      files,
    });
  }, [files]);

  const handleRemove = index => {
    const array = [...files];
    array.splice(index, 1);
    setFiles(array);
  };

  return (
    <div className="np-card mt-3">
      <Toast ref={toast} />
      <h2 className="np-card-title text-xl mb-5 font-medium">Pictures *</h2>
      <>
        <div className="productPictures">
          <div
            {...getRootProps()}
            className="productPictures__dropZone"
            style={{
              borderColor: isDragActive ? "#4318FF" : "rgb(192, 192, 192)",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop the product pictures or video</p>
            )}
          </div>
        </div>
        {fileErrors && fileErrors.hasError ? (
          <p className="text-red-400 mt-2 text-sm">{fileErrors.message}</p>
        ) : null}
        {errors && "files" in errors ? (
          <p className="text-red-400 mt-2 text-sm">{errors["files"]}</p>
        ) : null}
      </>
      {files && files.length > 0 && (
        <div className="previewPictures mt-3">
          {files.map((file, index) => (
            <div className="previewPictures__item" key={index}>
              <Image src={file.url} alt="Image" width="130" preview />
              <div
                className="previewPictures__overlay"
                onClick={() => handleRemove(index)}
              >
                <div className="previewPictures__cancel">
                  <i className="pi pi-trash"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Photos;
