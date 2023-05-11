import { Button } from "primereact";
import React from "react";

const HeroSlideItem = () => {
  return (
    <div className="flex align-items-center gap-4 p-2 hero-slide-item">
      <img
        src="https://images.unsplash.com/photo-1683538967101-a1543aac2dc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=434&q=80"
        className="h-5rem w-5rem border-round-2xl"
      />
      <div>
        <h4 className="text-xl">This is a slide caption</h4>
        <p className="text-gray-600 mb-2 mt-2">
          Im presenting the slide subcaption
        </p>
        <a href="https://www.yousrasafsaf.com" target="_blank" rel="noreferrer">
          https://www.yousrasafsaf.com
        </a>
      </div>
      <div className="flex flex-column gap-2">
        <Button icon="pi pi-trash" className="p-button-danger p-button-sm" />
        <Button
          icon="pi pi-file-edit"
          className="p-button-sm p-button-secondary"
        />
      </div>
    </div>
  );
};

export default HeroSlideItem;
