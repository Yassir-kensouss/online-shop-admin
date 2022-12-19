import { InputText, Toast } from "primereact";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Pagination = props => {
  const { setCurrentPage, currentPage, count, perPage,setScrollTop } = props;

  const toast = useRef(null);

  const [goTo, setGoTo] = useState(null);

  const handlePrev = () => {
    const el = document.querySelector(".dashboard__main");
    setScrollTop(el?.scrollTop);
    if (currentPage != 1) {
      setCurrentPage(parseInt(currentPage) - 1);
    }
  };

  const handleNext = () => {
      const el = document.querySelector(".dashboard__main");
      setScrollTop(el?.scrollTop);
    if (currentPage != Math.ceil(count / perPage)) {
      setCurrentPage(parseInt(currentPage) + 1);
    }
  };

  const goToSpecificPage = e => {
    if (e.key === "Enter") {
      if (goTo < 1) {
        toast.current.show({
          severity: "error",
          detail: "Page number can not be less than 1",
          life: 3000,
        });
        return;
      } else if (goTo > Math.ceil(count / perPage)) {
        toast.current.show({
          severity: "error",
          detail: `Page number can not be grater than ${
            Math.ceil(count / perPage)
          }`,
          life: 3000,
        });
        return;
      }
      setCurrentPage(goTo);
    }
  };

  const goToPageValue = e => {
    setGoTo(e.target.value);
  };

  useEffect(() => {
    console.log('count23', count)
  },[])

  console.log('math', currentPage,count,perPage, Math.ceil(count / perPage))

  return (
    <>
      <Toast ref={toast} />
      <div className="pagi">
        <div className="mr-5">
          Go to{"  "}
          <InputText
            onChange={goToPageValue}
            onKeyUp={goToSpecificPage}
            type="number"
            min={1}
            max={Math.ceil(count / perPage)}
            className="w-4rem"
          />
        </div>
        {currentPage} - {currentPage * perPage} of {count}
        <button
          onClick={() => {
            handlePrev()
          }}
          aria-label="previous page"
          className={
            currentPage == 1
              ? "prev pagi__button pagi__button--disabled"
              : "prev pagi__button"
          }
        >
          <i className="pi pi-angle-left"></i>
        </button>
        <button
          onClick={() => {
            handleNext();
          }}
          aria-label="previous page"
          className={
            count < 11 || currentPage === Math.ceil(count / perPage)
              ? "next pagi__button pagi__button--disabled"
              : "next pagi__button"
          }
        >
          <i className="pi pi-angle-right"></i>
        </button>
      </div>
    </>
  );
};

export default Pagination;

Pagination.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    setScrollTop: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
}