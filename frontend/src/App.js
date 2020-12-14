import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'
import './App.css'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <Router>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <a className='brand' href='index.html'>
              amazona
            </a>
          </div>
          <div className='signin'>
            <a href='/cart'>Cart</a>
            <a href='/signing'>Signin</a>
          </div>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={ProductDetails} />
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </Router>
  )
}

export default App
