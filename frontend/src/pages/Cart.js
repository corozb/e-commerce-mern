import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'

export default function Cart({ history, location }) {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const qty = +location.search.split('=')[1]

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    // delete
  }

  const checkoutHandler = () => {
    history.push('/signin?redirect=shipping')
    // history.push('/')
  }

  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Shooping Cart</h1>
        {!cartItems.length ? (
          <Message>
            Cart is empty. <Link to='/'>Go Shopping</Link>
          </Message>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className='row'>
                  <div>
                    <img src={item.image} alt={item.name} className='small' />
                  </div>
                  <div className='min-30'>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type='button'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((acc, el) => acc + el.qty, 0)}{' '}
                items) : $
                {cartItems.reduce((acc, el) => acc + el.price * el.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type='button'
                onClick={checkoutHandler}
                className='primary block'
                disabled={!cartItems.length}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
