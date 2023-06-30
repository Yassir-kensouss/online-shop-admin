import { Image } from "primereact";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { shortenString } from "../../utils/helpers";
import SeeMore from "../SeeMore";

const PreviewProduct = props => {
  const { product } = props;

  const settings = useSelector(state => state.settings.personalize);
  const currency = settings.currency?.split("-")[1];

  console.log("product", product);

  return (
    <section className="flex align-items-start gap-4">
      <div>
        <Galleria images={product.photos} />
      </div>
      <div className="w-25rem h-23rem overflow-auto">
        <h3 className="capitalize font-semibold text-xl text-700">
          {product.name}
        </h3>
        <label
          className="mt-3 mb-2 text-900 block font-semibold"
          htmlFor="description"
        >
          Description:
        </label>
        <div id="description">
          <SeeMore text={product.description} limit="150" />
        </div>
        <label
          className="mt-3 mb-2 text-900 block font-semibold"
          htmlFor="shortDescription"
        >
          Short Description:
        </label>
        <div id="shortDescription">
          <SeeMore text={product.shortDescription} limit="150" />
        </div>
        <div className="flex align-items-center gap-4">
          <div>
            <label
              className="mt-3 mb-2 text-900 block font-semibold"
              htmlFor="price"
            >
              Price:
            </label>
            <div id="price">{`${currency} ${product.price}`}</div>
          </div>
          <div>
            <label
              className="mt-3 mb-2 text-900 block font-semibold"
              htmlFor="oldPrice"
            >
              Old Price:
            </label>
            <div id="oldPrice">
              {product.oldPrice ? `${product.oldPrice}$` : "Not provided"}
            </div>
          </div>
        </div>
        <label
          className="mt-3 mb-2 text-900 block font-semibold"
          htmlFor="quantity"
        >
          Quantity:
        </label>
        <div id="quantity">
          <SeeMore text={product.quantity} limit="150" />
        </div>
        <label className="mt-3 mb-2 text-900 block font-semibold" htmlFor="sku">
          SKU:
        </label>
        <div id="sku">
          <SeeMore text={product.sku} limit="150" />
        </div>
        <label
          className="mt-3 mb-2 text-900 block font-semibold"
          htmlFor="shortDescription"
        >
          Tags:
        </label>
        <div
          id="shortDescription"
          className="flex align-items-center gap-2 flex-wrap"
        >
          {product.tags.length > 0
            ? product.tags.map(tag => <span key={tag}>#{tag}</span>)
            : "Not provided"}
        </div>
        <label
          className="mt-3 mb-2 text-900 block font-semibold"
          htmlFor="shortDescription"
        >
          Categories:
        </label>
        {/* <div id="shortDescription" className="flex align-items-center gap-2 flex-wrap">
            {
                product.categories.map(category => (
                    <span className="capitalize" key={category}>{category.name}</span>
                ))
            }
        </div> */}
      </div>
    </section>
  );
};

export default PreviewProduct;

export const Galleria = ({ images }) => {
  const [mainImg, setMainImg] = useState(images[0].url);
  return (
    <section className="flex align-items-start gap-3">
      <div className="h-24rem overflow-auto product-preview-gallery">
        {images.map(image => (
          <div key={image.url} className="preview-product-images">
            <img
              className="w-full border-round-sm"
              src={image.url}
              onClick={() => setMainImg(image.url)}
              title="image thumbnail"
              alt="image thumbnail"
            />
          </div>
        ))}
      </div>
      <div>
        <Image
          alt="image thumbnail"
          title="image thumbnail"
          preview
          className="preview-product-photo w-24rem h-24rem object-fit-cover border-round-sm"
          src={mainImg}
        />
      </div>
    </section>
  );
};
