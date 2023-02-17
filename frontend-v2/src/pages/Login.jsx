import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getCurrentUser } from '../redux/currentUserSlice'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.currentUser);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(getCurrentUser({
      email: emailInput,
      password: passwordInput
    }))
    .then(() => navigate("/"))
    .catch(err => console.log(err));
  }
    
  return (
      <div className='flex flex-col items-center justify-center h-screen bg-red-200'>
        <div className='my-4'>
          
          <form onSubmit={handleLogin}>
            <input 
              type='text' 
              onChange={e => setEmailInput(e.target.value)}
              className='border-2 border-black' 
            />

            <input 
              type='password' 
              onChange={e => setPasswordInput(e.target.value)}
              className='border-2 border-black' 
            />

            <input 
              type='submit'
              className='border-2 border-black' 
            />
          </form>

        </div>

        <div className='w-screen bg-green-100 px-16'>
          <p className=''><b>Id:</b> {currentUser.id}</p>
          <p className=''><b>First Name:</b> {currentUser.firstName}</p>
          <p className=''><b>Last Name:</b> {currentUser.lastName}</p>
          <p className=''><b>Email:</b> {currentUser.email}</p>
          <p className=''><b>Projects:</b> {JSON.stringify(currentUser.projects)}</p>
          <p className='truncate'><b>Token:</b> {currentUser.token}</p>
        </div>

      </div>
    )
}