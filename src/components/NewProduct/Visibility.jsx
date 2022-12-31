import { Calendar, Editor, InputText, InputTextarea, RadioButton } from 'primereact'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { ContextContainer } from '../../pages/NewProduct';

const BasicInfo = () => {

  const [visibility, setVisibility] = useState(null)
  const { product, setProduct } = useContext(ContextContainer);

  useEffect(() => {

    setProduct({
        ...product,
        visibility: visibility
    })

  },[visibility])

  return (
    <div className='bg-white p-3 border-round-sm w-full'>
        <h2 className='text-xl mb-5 font-medium text-800'>Visibility</h2>
        <div className="field-radiobutton">
            <RadioButton inputId="published" name="published" className='p-radiobutton-sm' value="published" onChange={(e) => setVisibility(e.value)} checked={visibility === 'published'} />
            <label htmlFor="published">Published</label>
        </div>
        <div className="field-radiobutton">
            <RadioButton inputId="scheduled" name="scheduled" className='p-radiobutton-sm' value="scheduled" onChange={(e) => setVisibility(e.value)} checked={visibility === 'scheduled'} />
            <label htmlFor="scheduled">Scheduled</label>
        </div>
        <div className="field-radiobutton">
            <RadioButton inputId="hidden" name="hidden" className='p-radiobutton-sm' value="hidden" onChange={(e) => setVisibility(e.value)} checked={visibility === 'hidden'} />
            <label htmlFor="hidden">Hidden</label>
        </div>
        <Calendar id="icon" className='w-full'  showIcon />
    </div>
  )
}

export default BasicInfo 