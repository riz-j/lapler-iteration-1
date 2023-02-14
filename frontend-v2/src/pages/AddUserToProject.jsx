import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { addUsersToProject } from "../redux/currentProjectSlice";

export default function AddUserToProject() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const currentProject = useSelector(state => state.currentProject);
    const token = useSelector(state => state.currentUser.token);
    const dispatch = useDispatch();
    const [emailList, setEmailList] = useState([]);
    const [email, setEmail] = useState('');

    const handleAddEmail = () => {
        setEmailList([...emailList, email])
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(-1);
        dispatch(addUsersToProject({
            projectId: projectId,
            emailList: emailList,
            token: token
        }));
    }

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center">
            <h1 className="text-xl mb-4">Add users to project {projectId}</h1>
            { emailList &&
                emailList.map(email => <h1>{email}</h1>)
            }

            <div className="flex">
                <input type="text" className="border-2 border-black px-2 py-1 rounded-lg"
                onChange={e => setEmail(e.target.value)}/>
                <button type="submit" className="border-2 border-black px-2 py-1 rounded-lg"
                onClick={handleAddEmail}>Add</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">  
                <input type="submit" className="border-2 border-black px-2 py-1 rounded-lg" />
            </form>
        </div>
    )
}