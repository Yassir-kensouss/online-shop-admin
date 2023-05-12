import { Button, Dialog } from "primereact";
import React from "react";
import HeroSlideItem from "./HeroSlideItem";
import { useState } from "react";
import HeroNewSlideForm from "./HeroNewSlideForm";
import { useQuery } from "react-query";
import { fetchHeroCarousal } from "../../services/settings";

const HeroCarousal = () => {
  const [slideDialog, setSlideDialog] = useState(false);
  const [slides, setSlides] = useState([]);

  const { isLoading, refetch } = useQuery(
    "fetch-hero-carousal",
    async () => {
      const response = await fetchHeroCarousal();
      const data = response.data.slides;
      console.log("data", data);
      setSlides(data);
      return data;
    },
    { refetchOnWindowFocus: false }
  );

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
        {slides.map(slide => (
          <li key={slide._id}>
            <HeroSlideItem
              caption={slide.caption}
              subCaption={slide.sub_caption}
              link={slide.link}
              photo={slide.photo}
              _id={slide._id}
              refetch={refetch}
            />
          </li>
        ))}
      </ul>
      <Dialog
        header="New slide"
        visible={slideDialog}
        style={{ width: "50vw" }}
        onHide={() => setSlideDialog(false)}
        draggable={false}
      >
        <HeroNewSlideForm refetch={refetch} setSlideDialog={setSlideDialog} />
      </Dialog>
    </div>
  );
};

export default HeroCarousal;
