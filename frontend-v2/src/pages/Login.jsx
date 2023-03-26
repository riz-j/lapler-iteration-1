import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getCurrentUser } from '../redux/currentUserSlice'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import lapler_logo from '../static/img/homepage/lapler-logo.png';
import ui_display_cropped from '../static/img/homepage/ui-display-cropped.png';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.currentUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(getCurrentUser({
      email: email,
      password: password
    }))
    .then(() => navigate("/"))
    .catch(err => console.log(err));
  }
    
  return (
    <>
      <div className='grid grid-cols-10 w-screen h-screen'>
          <div className='flex flex-col justify-center items-center col-span-4 bg-[#242529] text-white border-r border-[#4B4B4B]'>
              <h1 className='text-mm-lg font-black'>
                  Log In
              </h1>
              <form onSubmit={handleLogin} className='flex flex-col text-white w-8/12 my-4'>
                  <label className='text-md'>Email</label>
                  <input 
                      type='text' 
                      className='px-2 py-1.5 mb-3 mt-2 border border-gray-300 bg-transparent rounded'
                      onChange={e => setEmail(e.target.value)} 
                  />

                  <label className='text-md'>Password</label>
                  <input 
                      type='password' 
                      className='px-2 py-1.5 mb-3 mt-2 border border-gray-300 bg-transparent rounded'
                      onChange={e => setPassword(e.target.value)} 
                  />
                  <input
                      type='submit'
                      value='Log In'
                      className='px-2 py-1.5 mb-3 mt-3 bg-blue-800 h-10 text-md font-semibold bg-transparent rounded cursor-pointer' 
                  />
              </form>
              <div className='flex text-md'>
                  <p>Don't have an account? <Link to="/register" className='text-blue-300'>Click here to Register</Link></p>
              </div>
          </div>

          <div className='flex flex-col col-span-6 bg-platinum-main'>
              <div className='container h-full w-full px-[10vh] py-[5vw]'>
                  <img src={lapler_logo} className='h-10'/>
                  <div className='flex flex-col mt-10'>
                      <h1 className='text-[2.3rem] font-bold text-white'>Streamline your work.</h1>
                      <h1 className='text-[2.3rem] font-bold text-white'>Get things done.</h1>
                  </div>
              </div>
              <div className='relative w-full h-full'>
                  <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-end items-end bg-gradient-to-b from-transparent to-blue-900'>
                      <img src={ui_display_cropped} className='w-11/12' />
                  </div>
              </div>
          </div>
      </div>
  </>      
    )
  }
  



        // <div className='flex flex-col items-center justify-center h-screen bg-red-200'>
        //   <div className='my-4'>
            
        //     <form onSubmit={handleLogin}>
        //       <input 
        //         type='text' 
        //         onChange={e => setEmailInput(e.target.value)}
        //         className='border-2 border-black' 
        //       />
  
        //       <input 
        //         type='password' 
        //         onChange={e => setPasswordInput(e.target.value)}
        //         className='border-2 border-black' 
        //       />
  
        //       <input 
        //         type='submit'
        //         className='border-2 border-black' 
        //       />
        //     </form>
  
        //   </div>
  
        //   <div className='w-screen bg-green-100 px-16'>
        //     <p className=''><b>Id:</b> {currentUser.id}</p>
        //     <p className=''><b>First Name:</b> {currentUser.firstName}</p>
        //     <p className=''><b>Last Name:</b> {currentUser.lastName}</p>
        //     <p className=''><b>Email:</b> {currentUser.email}</p>
        //     <p className=''><b>Projects:</b> {JSON.stringify(currentUser.projects)}</p>
        //     <p className='truncate'><b>Token:</b> {currentUser.token}</p>
        //   </div>
  
        // </div>