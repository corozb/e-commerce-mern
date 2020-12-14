import React from 'react'
import data from '../../../backend/data'

import Product from '../components/Product'

export default function Home() {
  const { products } = data

  return (
    <div className='row center'>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  )
}
