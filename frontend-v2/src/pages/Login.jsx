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
      <div className='flex flex-col items-center justify-center h-screen bg-red-200'>
        <div className='my-4'>
          <form onSubmit={handleLogin}>
            <input className='border-2 border-black' type='text' onChange={e => setEmailInput(e.target.value)}/>
            <input className='border-2 border-black' type='password' onChange={e => setPasswordInput(e.target.value)}/>
            <input className='border-2 border-black' type='submit'/>
          </form>
        </div>

        <div className='w-screen bg-green-100 px-16'>
          <p className=''><b>First Name:</b> {currentUser.firstName}</p>
          <p className=''><b>Last Name:</b> {currentUser.lastName}</p>
          <p className=''><b>Email:</b> {currentUser.email}</p>
          <p className=''><b>Projects:</b> {JSON.stringify(currentUser.projects)}</p>
          <p className='truncate'><b>Token:</b> {currentUser.token}</p>
        </div>
      </div>
    )
}