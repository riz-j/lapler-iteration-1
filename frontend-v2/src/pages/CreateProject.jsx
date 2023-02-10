import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refetchCurrentUser } from "../redux/currentUserSlice";
import { createProject } from "../redux/projectSlice";

export default function CreateProject() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const [projectName, setProjectName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createProject({ 
            projectName: projectName,
            token: currentUser.token
         }))
         .then(() => dispatch(refetchCurrentUser()))
         .then(() => window.location.href = "/");
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl">Create Project</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input className="border-2 my-2 border-black" type="text" placeholder="name" onChange={e => setProjectName(e.target.value)} />
                <input className="border-2 my-2 border-black" type="submit" />
            </form>
        </div>
    )
}