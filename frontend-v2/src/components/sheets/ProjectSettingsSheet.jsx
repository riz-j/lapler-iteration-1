import { useState } from "react";

export default function ProjectSettingsSheet({ onClick }) {
    const [projectName, setProjectName] = useState('');
    const [projectAdmin, setProjectAdmin] = useState('');
    const [projectDisplayPic, setProjectDisplayPic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
      <div className='absolute inset-0 z-20'>
      <div 
        onClick={onClick} 
        className='flex justify-center items-center bg-green-500 w-full h-full bg-opacity-50'
      >
        <div 
            onClick={event => event.stopPropagation()}
            className='bg-red-500 w-[80%] h-[80%] z-30'
        >
          

            <h1>{projectName}</h1>
            <h1>{projectAdmin}</h1>
            <h1>{projectDisplayPic}</h1>

          <form className='flex flex-col gap-5 m-10 text-black'>
            <input type='text' onChange={e => setProjectName(e.target.value)} />
            <input type='text' onChange={e => setProjectAdmin(e.target.value)} />
            <input type='text' onChange={e => setProjectDisplayPic(e.target.value)} />
            <input type='submit' onClick={handleSubmit} />
          </form>

        </div>
      </div>
    </div>
    )
  }