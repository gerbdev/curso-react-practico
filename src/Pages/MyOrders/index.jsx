import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context'
import Layaout from "../../Components/Layaout"
import  OrdersCard  from "../../Components/OrdersCard"

function MyOrders() {
  const context  = useContext(ShoppingCartContext)

  return (
    <>
      <Layaout>
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1 className='font-medium text-xl'>My Orders</h1>
        </div>
        {
          context.order.map((order, index) => (
            <Link 
              key={index} 
              to={`/my-orders/${index}`}
            >
              <OrdersCard
                totalPrice={order.totalPrice} 
                totalProducts={order.totalProducts}
              />
            </Link>
          ))
        }
      </Layaout>
    </>
  )
}
 
export default MyOrders