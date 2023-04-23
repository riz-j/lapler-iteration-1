import { useEffect, useState } from 'react';
import LeftSidebar from '../components/dashboard/left-sidebar';
import ProjectNavigation from '../components/dashboard/project-navigation';
import { useSelector } from 'react-redux';
// import MainSection from '../components/main-section/issues/index.jsx';

export default function EmptyDashboard() {
    const currentUser = useSelector(state => state.currentUser);
    const initialShow = localStorage.getItem('left-sidebar-collapse') === 'true' ? true : false;
    const [show, setShow] = useState(initialShow);

    const handleLogout = async () => { 
      await localStorage.removeItem('reduxState'); 
      window.location.reload(); 
    }

    useEffect(() => {
      localStorage.setItem('left-sidebar-collapse', show)
    }, [show])

    console.log("Papa John's")

    function renderCloseButton() {
      return (
          <button
            onClick={() => setShow(!show)}
            className="absolute bottom-[30vh] left-[17rem] z-10 bg-platinum-tertiary opacity-40 hover:opacity-100 w-4 h-16 border-r border-t border-b hover:border-l border-gray-400 hover:border-white flex items-center justify-center rounded-r-2xl"
          >
            {'<'}
          </button> 
      )
    }

      function renderOpenButton() {
        return (
            <button
              onClick={() => setShow(!show)}
              className="absolute bottom-[30vh] left-0 z-10 bg-platinum-tertiary opacity-40 hover:opacity-100 w-4 h-16 border-r border-t border-b hover:border-l border-gray-400 hover:border-white flex items-center justify-center rounded-r-2xl"
            >
              {'>'}
            </button> 
        )
    }

    return (
        <div className='flex h-screen sm:text-sm text-font-color-primary'>
          
          <div className="flex">
            <ProjectNavigation />
            {/* <LeftSidebar /> */}
          </div>

          {/* { show ? renderCloseButton() : renderOpenButton() }   */}
          
          <div className='flex flex-col justify-center items-center w-full h-full bg-platinum-main p-24'>
            <div className='w-full'>
              <h1 className='text-xl'>{`👋 Hello ${currentUser.firstName}! `}</h1>
            </div>

            <div className='w-full'>
              { currentUser.projects.length !== 0 ? 
                <p className='text-lg my-2'>Select one of the existing projects or click on the "+" icon to create a new project.</p>
                :
                <p className='text-lg my-2'>Click on the "+" icon to create a new project.</p>
              }
              <p className='text-lg my-2'>Not you? Click here to <b className='text-red-300 underline cursor-pointer' onClick={handleLogout}>Log Out</b></p>
            </div>
          </div>

        </div>
      );
}