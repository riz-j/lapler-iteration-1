import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { refetchCurrentUser } from "../redux/currentUserSlice";
import { deleteProject } from "../redux/projectSlice";

export default function ProjectCard({projectId, projectName}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);

    const handleClick = async () => {
        await dispatch(deleteProject({
            projectIdToDelete: projectId,
            token: currentUser.token
        }))
        .then(() => dispatch(refetchCurrentUser()))
    }

    return (
        <div className="flex ">
            <Link to={`/dashboard/project/${projectId}`}>
                <p className="bg-blue-100 text-3xl px-4 py-2 rounded-lg">{projectName}</p>
            </Link>
            <button className="text-3xl text-red-500" onClick={handleClick}>
                x
            </button>
        </div>
    )
}
