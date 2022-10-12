import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { items } = props;

  return (
    <ul className="breadcrumbs">
      {items &&
        items.map((item, index) => (
          <li key={`crumb-${index}`} className="breadcrumbs__item">
            <Link
              to={item.url}
              className={
                index == items.length - 1
                  ? "breadcrumbs__link breadcrumbs__link-active"
                  : "breadcrumbs__link"
              }
            >
              {item.label}
            </Link>
            {index != items.length - 1 && (
              <span className="breadcrumbs__divider">/</span>
            )}
          </li>
        ))}
    </ul>
  );
};

export default BreadCrumb;
