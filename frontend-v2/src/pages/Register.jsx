import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, registerUser } from '../redux/currentUserSlice';
import { Link } from 'react-router-dom';
import lapler_logo from '../static/img/homepage/lapler-logo.png';
import ui_display_cropped from '../static/img/homepage/ui-display-cropped.png';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleRegisterFormSubmit = async (e) => {
        e.preventDefault();

        if (password != verifyPassword) {
            alert('Password does not match');
            return;
        }

        await dispatch(registerUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }))
        .then(() => dispatch(getCurrentUser({
            email: email,
            password: password
        })))
        .then(() => navigate('/'))
        .catch(err => console.log(err));
    }
    
    return (
        <>
            <div className='grid grid-cols-10 w-screen h-screen'>
                <div className='flex flex-col justify-center items-center col-span-10 lg:col-span-4 bg-platinum-secondary text-white border-r border-[#4B4B4B]'>
                    <h1 className='text-mm-lg font-black'>
                        Get started. It's free.
                    </h1>
                    <form onSubmit={handleRegisterFormSubmit} className='flex flex-col text-white w-8/12 my-4'>
                        <label className='text-md'>First Name</label>
                        <input 
                            type='text' 
                            className='px-2 py-1.5 mb-3 mt-2 border border-gray-300 bg-transparent rounded'
                            onChange={e => setFirstName(e.target.value)} 
                        />
                        
                        <label className='text-md'>Last Name</label>
                        <input 
                            type='text' 
                            className='px-2 py-1.5 mb-3 mt-2 border border-gray-300 bg-transparent rounded'
                            onChange={e => setLastName(e.target.value)} 
                        />

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
                        <label className='text-md'>Re-Enter Password</label>
                        <input  
                            type='password' 
                            className='px-2 py-1.5 mb-3 mt-2 border border-gray-300 bg-transparent rounded' 
                            onChange={e => setVerifyPassword(e.target.value)} 
                        />
                        <input
                            type='submit'
                            value='Create Account'
                            className='px-2 py-1.5 mb-3 mt-3 bg-blue-800 h-10 text-md font-semibold bg-transparent rounded cursor-pointer' 
                        />
                    </form>
                    <div className='flex text-md'>
                        <p>Already have an account? <Link to="/login" className='text-blue-300'>Click here to Login</Link></p>
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
        // <div className='flex flex-col items-center justify-center w-screen h-screen bg-red-200'>
        //     <h1 className='m-4 text-xl'>Register</h1>
        //     <form onSubmit={handleRegisterFormSubmit} className='grid grid-cols-1 gap-4'>
        //         <input type='text' placeholder='First Name' onChange={e => setFirstName(e.target.value)} className='px-4 py-2 rounded-lg border-2 border-black'/>
        //         <input type='text' placeholder='Last Name' onChange={e => setLastName(e.target.value)} className='px-4 py-2 rounded-lg border-2 border-black'/>
        //         <input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)} className='px-4 py-2 rounded-lg border-2 border-black'/>
        //         <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} className='px-4 py-2 rounded-lg border-2 border-black'/>
        //         <input type='password' placeholder='Re-enter Password' onChange={e => setVerifyPassword(e.target.value)} className='px-4 py-2 rounded-lg border-2 border-black'/>
        //         <input type='submit' className='px-4 py-2 rounded-lg border-2 border-black'/>
        //     </form>
        // </div>
    )
}