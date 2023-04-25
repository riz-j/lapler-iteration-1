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

  const [loading, setLoading] = useState(false);
    
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await dispatch(getCurrentUser({
      email: email,
      password: password
    }))
    .then(() => {
        setLoading(false);
        navigate("/");
    })
    .catch(err => console.log(err));
  }
    
  return (
    <>
      <div className='grid grid-cols-10 w-screen h-screen'>
          <div className='flex flex-col justify-center items-center col-span-10 lg:col-span-4 bg-platinum-secondary text-white border-r border-[#4B4B4B]'>
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
                      value={loading ? 'Loading...' : 'Log In'}
                      className={`px-2 py-1.5 mb-3 mt-3 bg-blue-800 h-10 text-md font-semibold bg-transparent rounded cursor-pointer ${ loading && 'italic' }`}
                  />
              </form>
              <div className='flex text-md'>
                  <p>Don't have an account? <Link to="/register" className='text-blue-300'>Click here to Register</Link></p>
              </div>
          </div>

          <div className='hidden lg:flex flex-col col-span-6 bg-platinum-main'>
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
  


