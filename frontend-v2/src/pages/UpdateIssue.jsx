import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentProject, updateIssue } from '../redux/currentProjectSlice';

export default function UpdateIssue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { issueId, projectId } = useParams();
    const projectMembers = useSelector(state => state.currentProject.users);
    const token = useSelector(state => state.currentUser.token);
    
    const allIssues = useSelector(state => state.currentProject.issues);
    const issueToUpdate = allIssues.find(issue => issue.id === parseInt(issueId));

    const [typeOfIssue, setTypeOfIssue] = useState(issueToUpdate.typeOfIssue || null);
    const [priorityOfIssue, setPriorityOfIssue] = useState(issueToUpdate.priorityOfIssue || null);
    const [statusOfIssue, setStatusOfIssue] = useState(issueToUpdate.statusOfIssue || null);
    const [summary, setSummary] = useState(issueToUpdate.summary || null);
    const [toggleDueDate, setToggleDueDate] = useState(!(issueToUpdate.dueDate === null || issueToUpdate.dueDate === "" || issueToUpdate.dueDate === undefined));
    const [assigneeId, setAssigneeId] = useState(issueToUpdate.assigneeId || null);
    const [reporterId, setReporterId] = useState(issueToUpdate.reporterId || null);

    const [dueDateDay, setDueDateDay] = useState(1);
    const [dueDateMonth, setDueDateMonth] = useState(2);
    const [dueDateYear, setDueDateYear] = useState(2023);
    const dueDate = new Date(dueDateYear, dueDateMonth - 1, dueDateDay, 0, 0, 0).toISOString();
    useEffect(() => { console.log(dueDate) }, [dueDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate(-1);
        await dispatch(updateIssue({
            issueId: issueId, 
            typeOfIssue: typeOfIssue, 
            priorityOfIssue: priorityOfIssue, 
            statusOfIssue: statusOfIssue, 
            summary: summary, 
            projectId: projectId, 
            dueDate: toggleDueDate ? dueDate : null,
            assigneeId: (assigneeId !== "") ? assigneeId : null,
            reporterId: reporterId, 
            token: token
        }))
        .then(() => dispatch(getCurrentProject({
            projectId: projectId,
            token: token
        })))
        .catch(err => console.log(err));
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            
            <h1 className='text-2xl pb-4'>Update Issue</h1>
            
            <form 
                onSubmit={handleSubmit} 
                className='grid grid-cols-1 gap-4 w-1/3 justify-center justify-items-center'
            >
                <select 
                    value={typeOfIssue} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                    onChange={e => setTypeOfIssue(e.target.value)}
                >
                    <option value='Bug'>Bug</option>
                    <option value='Improvement'>Improvement</option>
                    <option value='New Feature'>New Feature</option>
                    <option value='Epic'>Epic</option>
                    <option value='Idea'>Idea</option>
                </select>

                <select 
                    value={priorityOfIssue} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                    onChange={e => setPriorityOfIssue(e.target.value)} 
                >
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </select>

                <select 
                    value={statusOfIssue} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                    onChange={e => setStatusOfIssue(e.target.value)} 
                >
                    <option value='Backlog'>Backlog</option>
                    <option value='Waiting'>Waiting</option>
                    <option value='Doing'>Doing</option>
                    <option value='Done'>Done</option>
                </select>

                <input 
                    type='text' 
                    value={summary} 
                    placeholder='summary' 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                    onChange={e => setSummary(e.target.value)} 
                />

                <div className='flex w-full'>
                    <input type={'checkbox'} checked={toggleDueDate} onChange={() => setToggleDueDate(!toggleDueDate)}/>
                    <select 
                        value={dueDateDay} 
                        onChange={e => setDueDateDay(e.target.value)}
                        className='border-2 border-black px-2 py-1 rounded-md w-full'
                        disabled={!toggleDueDate}
                    >
                        <option value='01'>1</option> <option value='02'>2</option>
                        <option value='03'>3</option> <option value='04'>4</option>
                        <option value='05'>5</option> <option value='06'>6</option>
                        <option value='07'>7</option> <option value='08'>8</option>
                        <option value='09'>9</option> <option value='10'>10</option>
                        <option value='11'>11</option> <option value='12'>12</option>
                        <option value='13'>13</option> <option value='14'>14</option>
                        <option value='15'>15</option> <option value='16'>16</option>
                        <option value='17'>17</option> <option value='18'>18</option>
                        <option value='19'>19</option> <option value='20'>20</option>
                        <option value='21'>21</option> <option value='22'>22</option>
                        <option value='23'>23</option> <option value='24'>24</option>
                        <option value='25'>25</option> <option value='26'>26</option>
                        <option value='27'>27</option> <option value='28'>28</option>
                        <option value='29'>29</option> <option value='30'>30</option>
                        <option value='31'>31</option>
                    </select>
                    <select 
                        value={dueDateMonth} 
                        onChange={e => setDueDateMonth(e.target.value)}
                        className='border-2 border-black px-2 py-1 rounded-md w-full'
                    >
                        <option value='01'>January</option>
                        <option value='02'>February</option>
                        <option value='03'>March</option>
                        <option value='04'>April</option>
                        <option value='05'>May</option>
                        <option value='06'>June</option>
                        <option value='07'>July</option>
                        <option value='08'>August</option>
                        <option value='09'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                    </select>
                    <select 
                        value={dueDateYear} 
                        className='border-2 border-black px-2 py-1 rounded-md w-full'
                        onChange={e => setDueDateYear(e.target.value)}
                    >
                        <option value='2023'>2023</option>
                        <option value='2024'>2024</option>
                        <option value='2025'>2025</option>
                        <option value='2026'>2026</option>
                        <option value='2027'>2027</option>
                    </select>
                </div>

                <select 
                    value={assigneeId} 
                    onChange={e => setAssigneeId(e.target.value)} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                >
                    <option value={''}>None</option>
                    { projectMembers &&
                        projectMembers.map(user => 
                            <option value={user.id}>{user.firstName} {user.lastName}</option>
                        ) 
                    }
                </select>

                <select 
                    value={reporterId} 
                    onChange={e => setReporterId(e.target.value)} 
                    className='border-2 border-black px-2 py-1 rounded-md w-full'
                >
                    { projectMembers && 
                        projectMembers.map(user => 
                            <option value={user.id}>{user.firstName} {user.lastName}</option>
                        ) 
                    }
                </select>

                <input 
                    type='submit' 
                    className='border-2 border-black px-2 py-1 rounded-md w-3/4' 
                />

            </form>
        </div>
    )
}
