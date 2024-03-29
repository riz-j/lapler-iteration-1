import { Link } from 'react-router-dom';
import lapler_logo from '../../static/img/homepage/lapler-logo.png'
import ui_display from '../../static/img/homepage/ui-display.png'
import lightningIconBlack from '../../static/img/homepage/ligntningIconBlack.png'
import github_logo from '../../static/img/homepage/github-logo.png'

export default function VisitorHomepage() {
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center px-[10vw] bg-black w-full h-[15vh] md:h-[20vh]'>
                <div>
                    <img src={lapler_logo} className='h-8'/>
                </div>
                <div className='hidden md:flex items-center gap-12 text-gray-300'>
                    {/* <p className='hover:text-white'>Docs</p> */}
                    <Link to='/login'>
                        <p className='hover:text-white'>
                            Login
                        </p>
                    </Link>
                    <Link to='/register'>
                        <p className='hover:text-white border border-gray-400 hover:border-white px-2.5 py-1.5 rounded'>
                            Get Started 
                        </p>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center bg-black w-full h-[55vh] md:h-[65vh]'>
                
                <h1 className='md:8/12 lg:w-7/12 m-4 text-center font-black text-[2rem] lg:text-3xl md:text-3xl text-white leading-tight tracking-tight'>
                    The Issue Tracking Software You'll Love <a className='hidden md:inline'>Using</a>
                </h1>
                <p className='md:w-7/12 md:text-center text-gray-400 leading-tight tracking-tight text-[1rem] md:text-m-lg px-10 text-justify'>
                    An open-source bug tracker for software teams that centralizes bug tracking, 
                    issue management, and feature requests. It includes customizable workflows, 
                    tagging, filtering, sorting, and integrates with version control systems.
                </p>

                <div className='flex flex-col md:flex-row gap-5 p-10'>
                    <Link 
                        to='/register'
                        className='flex md:flex-row items-center justify-center gap-2 text-black px-8 bg-white py-2.5 text-m-lg font-semibold rounded-md'
                    >
                        <img src={lightningIconBlack} className='h-6'/>
                        <p>Start Tracking</p>
                    </Link>
                    <Link 
                        to='https://github.com/riz-j/lapler-iteration-1' 
                        target='_blank'
                        className='flex items-center justify-center gap-3 text-white px-8 bg-black py-2.5 text-m-lg font-semibold rounded-md border-2 border-white'
                    >
                        <img src={github_logo} className='w-6' />
                        <p>View on GitHub</p>
                    </Link>
                </div>
            </div>
            <div className='flex justify-center pb-12 md:pb-20 bg-gradient-to-b from-black to-blue-900'>
                <img src={ui_display} className='rounded w-11/12 md:w-10/12 border border-blue-700' />
            </div>
            <div className='flex items-center justify-between h-[10vh] md:h-[20vh] bg-black px-[8vw]'>
                <div>
                    <img src={lapler_logo} className='h-8' />
                </div>
            </div>
        </div>
    )
}