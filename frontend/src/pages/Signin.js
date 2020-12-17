import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import { signin } from '../actions/userActions'
import Message from '../components/Message'
import Spinner from '../components/Spinner'

export default function Signin({ location }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const redirect = location.search?.split('=')[1]
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo, loading, error } = userSignin

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  return (
    <>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <Spinner />}
        {error && <Message variant='danger'>{error}</Message>}
        <div>
          <label htmlFor='email'>Email Adress</label>
          <input
            type='email'
            id='email'
            placeholder='Enter email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to='/register'>Create your account</Link>
          </div>
        </div>
      </form>
    </>
  )
}
