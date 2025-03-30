import React from 'react'

const OrderCard = (props) => {
  return (
    <div className="max-w-[800px]  px-8 mt-5  space-x-10 p-4 mx-auto">
    <div className="p-4  flex justify-between rounded-lg shadow-xl hover:scale-110 duration-300">
      <div className="font-bold text-md space-y-1">
        <p className="text-gray-400 font-medium text-lg pb-1">
          Order Time:{props.Time}
        </p>
        <p>
          Order Id:
          <span className="text-[#9000D3]">{props.id}</span>
        </p>
        <p>Product : {props.LItem-1}Item</p>
        <p>Payment Type:COD</p>
        <p>Phone:{props.phone}</p>
        <p>Address:{props.add}</p>
      </div>
      <div className="flex flex-col justify-between">
        <p className="font-bold text-2xl break-word">
          Status:
          <p className="font-semibold text-xl text-[#00FF85]">
            {props.status}
          </p>
        </p>
        <p className="font-bold text-xl ">Total:₹ {props.total} /- </p>
      </div>
    </div>
  </div>
  )
}

export default OrderCard