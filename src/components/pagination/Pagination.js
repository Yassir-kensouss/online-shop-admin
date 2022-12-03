import { Button } from 'primereact';
import React from 'react'

const Pagination = (props) => {
    const {pages} = props;
  return (
    <div className='pagi'>
        <button className='pagi__button pagi__button--active'>
            1
        </button>
    </div>
  )
}

export default Pagination