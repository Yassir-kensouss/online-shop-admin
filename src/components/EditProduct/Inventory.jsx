import { InputNumber, InputText } from 'primereact'
import React from 'react'

const Inventory = (props) => {

  const { product, setProduct } = props;

  return (
    <div className='bg-white p-3 border-round-sm mt-3'>
        <h2 className='text-xl mb-5 font-medium text-800'>Inventory</h2>
        <div className='product-title-field mb-3'>
            <label htmlFor="sku" className='block text-sm mb-2'>SKU</label>
            <InputText id="sku" className='p-inputtext-sm w-full' placeholder='SCREW150' 
              onChange={e => setProduct({ ...product, sku: e.target.value })}
              value={product.sku}
            />
        </div>
        <div className='product-title-field'>
            <label htmlFor="stock-quantity" className='block text-sm mb-2'>Stock quantity</label>
            <InputNumber inputId="stock-quantity" className='p-inputtext-sm w-full' 
              onValueChange={e => setProduct({ ...product, quantity: e.target.value })}
              value={product.quantity}
            />
        </div>
    </div>
  )
}

export default Inventory 