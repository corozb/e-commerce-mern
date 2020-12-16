import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import './App.css'

function App() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <Router>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>
              amazona
            </Link>
          </div>
          <div className='signin'>
            <Link to='/cart'>
              Cart
              {cartItems.length ? (
                <span className='badge'>{cartItems.length}</span>
              ) : null}
            </Link>
            <Link to='/signin'>Signin</Link>
          </div>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/cart/:id?' component={Cart} />
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </Router>
  )
}

export default App
