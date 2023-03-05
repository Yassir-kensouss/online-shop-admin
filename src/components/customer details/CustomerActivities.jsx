import React from 'react'
import DetailsCards from '../DetailsCards'

const CustomerActivities = () => {
  return (
    <DetailsCards>
        <h2 className='text-xl text-600 font-semibold'>Recent Activities</h2>
        <section className='h-20rem max-h-30rem overflow-auto'>
          <div className='p-2 mt-2 border-round-sm customer-recent-activities'>
            <h3 className='font-semibold text-black capitalize'>logged in</h3>
            <time className='text-gray-600 mt-1 block'>two hours ago</time>
          </div>
          <div className='p-2 mt-2 border-round-sm customer-recent-activities'>
            <h3 className='font-semibold text-black capitalize'>logged in</h3>
            <time className='text-gray-600 mt-1 block'>two hours ago</time>
          </div>
          <div className='p-2 mt-2 border-round-sm customer-recent-activities'>
            <h3 className='font-semibold text-black capitalize'>logged in</h3>
            <time className='text-gray-600 mt-1 block'>two hours ago</time>
          </div>
          <div className='p-2 mt-2 border-round-sm customer-recent-activities'>
            <h3 className='font-semibold text-black capitalize'>logged in</h3>
            <time className='text-gray-600 mt-1 block'>two hours ago</time>
          </div>
          <div className='p-2 mt-2 border-round-sm customer-recent-activities'>
            <h3 className='font-semibold text-black capitalize'>logged in</h3>
            <time className='text-gray-600 mt-1 block'>two hours ago</time>
          </div>
          <div className='p-2 mt-2 border-round-sm customer-recent-activities'>
            <h3 className='font-semibold text-black capitalize'>logged in</h3>
            <time className='text-gray-600 mt-1 block'>two hours ago</time>
          </div>
        </section>
    </DetailsCards>
  )
}

export default CustomerActivities