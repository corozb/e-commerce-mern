import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CheckoutStep from '../components/CheckoutStep'

export default function PlaceOrder({ history }) {
  const cart = useSelector((state) => state.cart)

  if (!cart.paymentMethod) {
    history.push('/payment')
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, el) => acc + el.qty * el.price,
    0
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10
  cart.taxPrice = +(0.15 * cart.itemsPrice).toFixed(2)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const placeorderHandler = () => {}

  return (
    <div>
      <CheckoutStep step1 step2 step3 step4 />
      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {cart.shippingAddress.address}{' '}
                  <br />
                  <strong>City:</strong> {cart.shippingAddress.city},{' '}
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className='row'>
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='small'
                          />
                        </div>
                        <div className='min-30'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          ${item.price} x {item.qty} = ${item.price * item.qty}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className='row'>
                  <div>Items</div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Tax</div>
                  <div>${cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type='button'
                  className='primary block'
                  disabled={!cart.cartItems.length}
                  onClick={placeorderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
