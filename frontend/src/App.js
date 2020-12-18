import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Signin from './pages/Signin'
import Register from './pages/Register'
import { signout } from './actions/userActions'
import './App.css'
import Shipping from './pages/Shipping'

function App() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

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
            {userInfo ? (
              <div className='dropdown'>
                <Link to='#'>
                  {userInfo.name}
                  <i className='fa fa-caret-down'></i>
                </Link>
                <ul className='dropdown-content'>
                  <Link to='#signout' onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to='/signin'>Signin</Link>
            )}
          </div>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/signin' component={Signin} />
          <Route path='/register' component={Register} />
          <Route path='/shipping' component={Shipping} />
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </Router>
  )
}

export default App
