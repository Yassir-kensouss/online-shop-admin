import { Calendar, RadioButton } from 'primereact'
import React, { useState } from 'react'
import { useEffect } from 'react';

const Visibility = (props) => {

  const { visibility, setVisibility } = props;

  return (
    <div className='bg-white p-3 border-round-sm w-full'>
        <h2 className='text-xl mb-5 font-medium text-800'>Visibility</h2>
        <div className="field-radiobutton">
            <RadioButton inputId="published" name="visibility" className='p-radiobutton-sm' value="published" onChange={(e) => setVisibility(e.value)} checked={visibility === 'published'} />
            <label htmlFor="published">Published</label>
        </div>
        <div className="field-radiobutton">
            <RadioButton inputId="scheduled" name="visibility" className='p-radiobutton-sm' value="scheduled" onChange={(e) => setVisibility(e.value)} checked={visibility === 'scheduled'} />
            <label htmlFor="scheduled">Scheduled</label>
        </div>
        <div className="field-radiobutton">
            <RadioButton inputId="hidden" name="visibility" className='p-radiobutton-sm' value="hidden" onChange={(e) => setVisibility(e.value)} checked={visibility === 'hidden'} />
            <label htmlFor="hidden">Hidden</label>
        </div>
        <Calendar id="icon" className='w-full'  showIcon />
    </div>
  )
}

export default Visibility 