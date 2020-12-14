import { useState, useEffect } from 'react'
import axios from 'axios'

import Product from '../components/Product'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/products')
      setLoading(false)
      setProducts(data)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }
  console.log(products)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='row center'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
