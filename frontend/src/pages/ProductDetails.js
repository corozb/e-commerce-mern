import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Rating from '../components/Rating'
import data from '../../../backend/data'

export default function ProductDetails() {
  const { id } = useParams()
  const { products } = data
  console.log(products)
  const product = products.find((x) => x._id === id)

  return (
    <>
      {product ? (
        <>
          <Link to='/'>Back to result</Link>
          <div className='row top'>
            <div className='col-2'>
              <img src={product.image} alt={product.name} className='large' />
            </div>
            <div className='col-1'>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className='col-1'>
              <div className='card card-body'>
                <ul>
                  <li>
                    <div className='row'>
                      <div>Price</div>
                      <div className='price'>${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className='row'>
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className='success'>In Stock</span>
                        ) : (
                          <span className='error'>Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button className='primary block'>Add to Cart</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Product Not Found</div>
      )}
    </>
  )
}
