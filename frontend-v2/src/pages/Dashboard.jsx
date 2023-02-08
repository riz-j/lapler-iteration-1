import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { getCurrentProject } from "../redux/currentProjectSlice";

export default function Dashboard() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const currentProject = useSelector(state => state.currentProject);

    useEffect(() => {
        dispatch(getCurrentProject({ 
            projectId: projectId, 
            token: currentUser.token 
        }))
    }, [])

    return (
        <div className='flex h-screen sm:text-sm'>
            <div className='bg-green-300 w-80 hidden md:flex flex-col pt-4'>
                <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>All states</p>
                <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Some states</p>
                <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Few states</p>
                <Link to="/">
                    <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2 mt-96'>Home</p>
                </Link>
            </div>

            <div className='w-full bg-yellow-200'>
                <div className='bg-green-200 flex justify-center items-center h-8'>
                    <input className='w-1/2 h-6' />
                </div>

                { currentProject.issues ? currentProject.issues.map(issue => 
                    <div className='flex space-x-4 bg-blue-200 px-5 py-2 rounded-lg border-b-2'>
                        <p>{issue.id}</p>
                        <p>{issue.typeOfIssue}</p>
                        <p>{issue.priorityOfIssue}</p>
                         <p>{issue.summary}</p>
                    </div> ) 
                    : <></>
                }
            </div>

            <div className='bg-red-200 w-80 hidden md:block'>
                <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Project</p>
                <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Hello</p>
                <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Frick</p>
            </div>
        </div>
    )
}