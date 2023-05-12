import { Button, Dialog, Toast } from "primereact";
import React from "react";
import { useMutation } from "react-query";
import { deleteHeroCarousal } from "../../services/settings";
import { useRef } from "react";
import { useState } from "react";

const HeroSlideItem = ({ photo, caption, subCaption, link, _id, refetch }) => {
  const toast = useRef();

  const [confirm, setConfirm] = useState(false);

  const { isLoading, mutate } = useMutation(id => deleteHeroCarousal(id), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "Slide deleted",
        life: 3000,
      });
      setConfirm(false);
      refetch();
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => setConfirm(false)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => mutate(_id)}
          autoFocus
          className="p-button-sm"
        />
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex align-items-center gap-4 p-2 hero-slide-item">
        <div className="h-5rem w-5rem">
          <img
            src={photo}
            className="h-full block w-full border-round-2xl"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <h4 className="text-xl">{caption}</h4>
          <p className="text-gray-600 mb-2 mt-2">{subCaption}</p>
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </div>
        <div className="flex flex-column gap-2">
          <Button
            onClick={() => setConfirm(true)}
            icon="pi pi-trash"
            loading={isLoading}
            className="p-button-danger p-button-sm"
          />
          <Button
            icon="pi pi-file-edit"
            className="p-button-sm p-button-secondary"
          />
        </div>
      </div>
      <Dialog
        header="Confirm"
        visible={confirm}
        style={{ width: "20vw" }}
        onHide={() => setConfirm(false)}
        draggable={false}
        footer={renderFooter}
      >
        <p>Are you sure you want to delete this slide ?</p>
      </Dialog>
    </>
  );
};

export default HeroSlideItem;
