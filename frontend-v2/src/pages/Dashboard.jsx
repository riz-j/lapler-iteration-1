import { useState } from 'react';
import LeftSidebar from '../components/dashboard/left-sidebar';
import ProjectNavigation from '../components/dashboard/project-navigation';
import MainSection from '../components/main-section/issues/index.jsx';

export default function Dashboard() {
    const [show, setShow] = useState(true);

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
          
          <div className={`flex ${!show && 'hidden'}`}>
            <ProjectNavigation />
            <LeftSidebar />
          </div>

          { show ? renderCloseButton() : renderOpenButton() }  
          
          <MainSection />

        </div>
      );
}