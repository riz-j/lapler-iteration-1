import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createIssue, getCurrentProject } from '../redux/currentProjectSlice';

export default function CreateIssue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { projectId } = useParams();
    const currentUser = useSelector(state => state.currentUser);
    const token = currentUser.token;
    const projectMembers = useSelector(state => state.currentProject.users);

    const [typeOfIssue, setTypeOfIssue] = useState('Bug');
    const [priorityOfIssue, setPriorityOfIssue] = useState('Low');
    const [statusOfIssue, setStatusOfIssue] = useState('Backlog');
    const [summary, setSummary] = useState('');
    const [assigneeId, setAssigneeId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate(-1);
        await dispatch(createIssue({
            token: currentUser.token,
            projectId: projectId,
            typeOfIssue: typeOfIssue,
            priorityOfIssue: priorityOfIssue,
            statusOfIssue: statusOfIssue,
            ...(assigneeId && { assigneeId }),
            summary: summary
        }))
        .then(() => dispatch(getCurrentProject({
            projectId: projectId,
            token: token
        })))
        .catch(err => console.log(err));
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            
            <h1 className='text-2xl pb-4'>Create New Issue</h1>
            
            <form 
                onSubmit={handleSubmit} 
                className='grid grid-cols-1 gap-4 w-1/3 justify-center justify-items-center'
            >
                <select 
                    value={typeOfIssue} 
                    onChange={e => setTypeOfIssue(e.target.value)} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                >
                    <option value='Bug'>Bug</option>
                    <option value='Improvement'>Improvement</option>
                    <option value='New Feature'>New Feature</option>
                    <option value='Epic'>Epic</option>
                    <option value='Idea'>Idea</option>
                </select>

                <select 
                    value={priorityOfIssue} 
                    onChange={e => setPriorityOfIssue(e.target.value)} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                >
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </select>

                <select 
                    value={statusOfIssue} 
                    onChange={e => setStatusOfIssue(e.target.value)} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                >
                    <option value='Backlog'>Backlog</option>
                    <option value='Waiting'>Waiting</option>
                    <option value='Doing'>Doing</option>
                    <option value='Done'>Done</option>
                </select>

                <select 
                    value={assigneeId} 
                    onChange={e => setAssigneeId(e.target.value)} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                >
                    <option value={null}>No-one</option>
                    { projectMembers &&
                        projectMembers.map(user => 
                            <option value={user.id}>{user.firstName} {user.lastName}</option>
                        ) 
                    }
                </select>

                <input 
                    type='text' 
                    placeholder='summary' 
                    onChange={e => setSummary(e.target.value)} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                />

                <input 
                    type='submit' 
                    className='border-2 border-black px-2 py-1 rounded-md w-3/4' 
                />
            </form>
        </div>
    )
}