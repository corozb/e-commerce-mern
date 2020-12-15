import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addToCart } from '../actions/cartActions'

export default function Cart({ location }) {
  const { id: productId } = useParams()
  const dispatch = useDispatch()

  const qty = +location.search.split('=')[1]

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div>
      <h1>Cart</h1>
      <p>
        Add to Cart: Id: {productId} Qty: {qty}
      </p>
    </div>
  )
}
