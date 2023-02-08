import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getCurrentUser } from '../redux/currentUserSlice'


export default function Login() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(getCurrentUser({
      email: emailInput,
      password: passwordInput
    }))
  }
    
  return (
      <div>
        <form onSubmit={handleLogin}>
          <input type='text' onChange={e => setEmailInput(e.target.value)}/>
          <input type='password' onChange={e => setPasswordInput(e.target.value)}/>
          <input type='submit'/>
        </form>

        <div className='w-screen bg-green-100'>
          <p className=''>First Name: {currentUser.firstName}</p>
          <p className=''>Last Name: {currentUser.lastName}</p>
          <p className=''>Email: {currentUser.email}</p>
          <p className=''>Projects: {JSON.stringify(currentUser.projects)}</p>
          <p className='truncate'>Token: {currentUser.token}</p>
        </div>
      </div>
    )
}