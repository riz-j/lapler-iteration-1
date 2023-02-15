import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getCurrentProject, removeUserFromProject } from "../redux/currentProjectSlice";

export default function ProjectUserCard({userId, userFirstName, userLastName}) {
    const { projectId } = useParams();
    const token = useSelector(state => state.currentUser.token);
    const dispatch = useDispatch();

    const handleRemoveUser = async () => {
        await dispatch(removeUserFromProject({
            projectId: projectId, 
            userIdToRemove: userId, 
            token: token
        }))
        .then(() => dispatch(getCurrentProject({
            projectId: projectId,
            token: token
        })))
    }

    return (
        <div className="flex justify-between bg-blue-200 rounded-lg px-5 py-2 border-b-2">
            <p>{userFirstName} {userLastName}</p>
            <button onClick={handleRemoveUser} className="text-red-500">x</button>
        </div>
    )
}