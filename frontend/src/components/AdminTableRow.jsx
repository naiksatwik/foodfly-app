import React from 'react'
import { useProductContext } from '../context/ProductContext'

const AdminTableRow = (props) => {

  return (
    <tr className='text-center'>
    <td className='border-2'>
    <div className='text-green-700 text-left space-y-2'>
      <p>OrderId:{props._id}</p>

      {
       props.order_data.map((data,index)=>{
         
         return (index < props.order_data.length-1)?<div> {data.pname} - {data.noItem}pc </div>:<p className='text-lg'>Total:₹ {data}/-</p>
         
       })
      }
     
    </div>
    </td>
    <td className='border-2 text-left space-y-2'>
     <p>Name :{props.userName}</p>
     <p>Phone:{props.phone}</p>
    </td>
    <td className='border-2'>
      <p>{props.address}</p>
    </td>
    <td className='border-2'>
      <p>{props.status}</p>
    </td>
    <td className='border-2'>
    <p>{props.Time}</p>
    </td>

  </tr>
    
  )
}

export default AdminTableRow