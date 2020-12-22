import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { savePayment } from '../actions/cartActions'
import CheckoutStep from '../components/CheckoutStep'

export default function Payment({ history }) {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  console.log(shippingAddress)

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePayment(paymentMethod))
    history.push('/placeholder')
  }

  return (
    <div>
      <CheckoutStep step1 step2 step3 />
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type='radio'
              id='paypal'
              value='Paypal'
              name='paypalMethod'
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='paypal'>Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type='radio'
              id='stripe'
              value='Stripe'
              name='paypalMethod'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='stripe'>Stripe</label>
          </div>
        </div>
        <div>
          <button className='primary' type='submit'>
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}
