import React from 'react'

const DashCards = (props) => {
    const {title, children, rightContent} = props;
  return (
    <section className='bg-white border-round-xl p-3 pb-0'>
        <div className='mb-3 flex align-items-center justify-content-between'>
            <h2 className='text-l font-semibold text-primary-800 capitalize'>{title}</h2>
            <div>
                {rightContent}
            </div>
        </div>
        <div>
            {children}
        </div>
    </section>
  )
}

export default DashCards