import moment from 'moment/moment';
import React from 'react'
import DetailsCards from '../DetailsCards'
import EmptyBox from '../EmptyBox';

const CustomerActivities = (props) => {
  const {history} = props;
  return (
    <DetailsCards>
        <h2 className='text-xl text-600 font-semibold mb-4'>Recent Activities</h2>
        <section className='h-max-content max-h-30rem overflow-auto'>
          {
            history.length > 0 ?
            history.map((element, index) => (
            <div className='p-2 mt-2 border-round-sm customer-recent-activities' key={index}>
              <h3 className='font-semibold text-black capitalize'>{element.userActivity}</h3>
              <time className='text-gray-600 mt-1 block'>{moment(element.date).format('LLL')}</time>
            </div>
            )) : <EmptyBox title='No History' message='All customer activities will be listed here' icon={<i className='pi pi-history' style={{'fontSize': '0.6em'}}></i>}/>
          }
        </section>
    </DetailsCards>
  )
}

export default CustomerActivities