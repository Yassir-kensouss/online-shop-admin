import { Image, Paginator } from "primereact";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PRODUCT_DATATABLE_LIMIT } from "../../../common/constants";
import EmptyBox from "../../EmptyBox";

const BestSellingProducts = props => {
  const { refetch, products, total, setPage, page } = props;

  const settings = useSelector(state => state.settings.personalize);

  const currency = settings.currency?.split("-")[1];

  const handlePageChange = e => {
    setPage(e.page);
    refetch();
  };

  return (
    <>
      {products && products?.length > 0 ? (
        <>
          <table className="customTable">
            <thead>
              <tr className="customTable__headRow has-border">
                <th className="customTable__productNameTh">Product name</th>
                <th>Price</th>
                <th>Sold</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products?.map(product => (
                <tr key={product._id} className="customTable__tableRowChild">
                  <td className="customTable__productName">
                    <div className="flex align-items-center gap-2">
                      <div className="bsp-preview-image">
                        <Image
                          preview
                          src={product.photos[0].url}
                          className="object-fit-cover-img"
                        />
                      </div>
                      <h3 className="customTable__pname">{product.name}</h3>
                    </div>
                  </td>
                  <td className="customTable__productPrice">{`${currency} ${product.price}`}</td>
                  <td className="customTable__productSold">{product.sold}</td>
                  <td>
                    <Stock stock={product.stock} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginator
            first={page * PRODUCT_DATATABLE_LIMIT}
            rows={PRODUCT_DATATABLE_LIMIT}
            totalRecords={total}
            onPageChange={handlePageChange}
            style={{ transform: "scale(0.85)" }}
            className="bsp_table_pagination"
          />
        </>
      ) : (
        <EmptyBox
          icon={<i className="pi pi-shopping-cart text-4xl"></i>}
          parentClassName="pb-7"
          title="No Products"
          message="You don't have any sold product for the moment"
        />
      )}
    </>
  );
};

const Stock = ({ stock }) => {
  return (
    <div className="flex align-items-center gap-2">
      <i
        className={`pi pi-circle-fill text-xs ${
          stock ? "text-green-400" : "text-red-400"
        }`}
      ></i>
      <span
        className={`font-semibold text-xs ${
          stock ? "text-green-400" : "text-red-400"
        }`}
      >
        {stock ? "In Stock" : "Out of Stock"}
      </span>
    </div>
  );
};

export default BestSellingProducts;
