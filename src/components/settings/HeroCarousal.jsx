import { Button, Dialog } from "primereact";
import React from "react";
import HeroSlideItem from "./HeroSlideItem";
import { useState } from "react";
import HeroNewSlideForm from "./HeroNewSlideForm";

const HeroCarousal = () => {
  const [slideDialog, setSlideDialog] = useState(false);
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => setSlideDialog(false)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          autoFocus
          className="p-button-sm"
        />
      </div>
    );
  };
  return (
    <div className="w-full p-2">
      <div className="w-full flex justify-content-between align-items-center">
        <h2 className="text-gray-800 text-lg font-semibold">Slides</h2>
        <Button
          className="p-button-primary p-button-sm"
          label="Add slide"
          icon="pi pi-plus"
          onClick={() => setSlideDialog(true)}
        />
      </div>
      <ul className="mt-4 hero-slides">
        <li>
          <HeroSlideItem />
        </li>
        <li>
          <HeroSlideItem />
        </li>
        <li>
          <HeroSlideItem />
        </li>
        <li>
          <HeroSlideItem />
        </li>
      </ul>
      <Dialog
        header="New slide"
        visible={slideDialog}
        style={{ width: "50vw" }}
        onHide={() => setSlideDialog(false)}
        draggable={false}
      >
        <HeroNewSlideForm setSlideDialog={setSlideDialog} />
      </Dialog>
    </div>
  );
};

export default HeroCarousal;
