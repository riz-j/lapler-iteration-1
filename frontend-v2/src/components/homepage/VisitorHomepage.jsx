import { Link } from 'react-router-dom';
import lapler_logo from '../../static/img/homepage/lapler-logo.png'

export default function VisitorHomepage() {
    return (
        <div className='flex flex-col'>
        <div className='flex justify-between items-center px-36 bg-black w-full h-[20vh]'>
            <div>
                <img src={lapler_logo} className='h-8'/>
            </div>
            <div className='flex gap-12 text-gray-400'>
                <p className='hover:text-white'>Docs</p>
                <Link to='/login'><p className='hover:text-white'>Login</p></Link>
                <Link to='/register'><p className='hover:text-white'>Get Started</p></Link>
            </div>
        </div>
        <div className='flex flex-col items-center pt-12 bg-black w-full h-[80vh]'>
            
            <h1 className='w-7/12 m-4 text-white text-center font-black text-3xl leading-tight tracking-tight'>
                The Issue Tracking Software You'll Love Using
            </h1>
            <p className='w-1/2 text-center text-gray-400 text-m-lg leading-tight tracking-tight'>
            An open-source bug tracker for software teams that centralizes bug tracking, 
            issue management, and feature requests. It includes customizable workflows, 
            tagging, filtering, sorting, and integrates with version control systems.
            </p>

            <div className='flex gap-5 p-10'>
                <button className='text-black px-8 bg-white py-2.5 text-m-lg font-semibold rounded-md'>Start Tracking</button>
                <button className='text-white px-8 bg-black py-2.5 text-m-lg font-semibold rounded-md border-2 border-white'>View on GitHub</button>
            </div>

        </div>
        </div>
    )
}