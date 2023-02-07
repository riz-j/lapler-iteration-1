import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from './redux/currentUserSlice'

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  const handleClick = () => {
    dispatch(getCurrentUser({email: 'tscarff1@github.io', password: 'kIQ9xZx'}));
  }
  return (
    <div className='App'>
      <h2>Welcome back, {currentUser.firstName}! Your email is {currentUser.email}</h2>
      <p>Bro, your token is {currentUser.token}</p>
      {/* <h2>{JSON.stringify(currentUser)}</h2> */}
      <button onClick={handleClick}>Log In</button>

      <div className='flex h-screen sm:text-sm'>
        <div className='bg-green-300 w-80 hidden md:block pt-4'>
          <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>All states</p>
          <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Some states</p>
          <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Few states</p>
        </div>
        <div className='w-full bg-yellow-200'>
          <div className='bg-green-200 flex justify-center items-center h-8'>
            <input className='w-1/2 h-6' />
          </div>
          <h1 className='bg-blue-200 px-5 py-2 rounded-lg border-b-2'>Wyoming</h1>
          <h1 className='bg-blue-200 px-5 py-2 rounded-lg border-b-2'>Illinois</h1>
          <h1 className='bg-blue-200 px-5 py-2 rounded-lg border-b-2'>South Dakota</h1>
          <h1 className='bg-blue-200 px-5 py-2 rounded-lg border-b-2'>Colorado</h1>
          <h1 className='bg-blue-200 px-5 py-2 rounded-lg border-b-2'>California</h1>
          <h1 className='bg-blue-200 px-5 py-2 rounded-lg border-b-2'>Oregon</h1>
        </div>
        <div className='bg-red-200 w-80 hidden md:block'>
          <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Project</p>
          <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Hello</p>
          <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Frick</p>
        </div>
      </div>
    </div>
  )
}

export default App
