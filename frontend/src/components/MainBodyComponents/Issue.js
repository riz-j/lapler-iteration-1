import { useState } from 'react';
import bugIcon from './../../icons/bug.svg'
import improvementIcon from './../../icons/improvement.png'
import newFeatureIcon from './../../icons/idea.png'


const Issue = ({type, item_key, priority, summary, status, due_date, assignee, reporter}) => {
    const [typeIcon, setTypeIcon] = useState("");

    const typeImage = (typeOfIssue) => {
        switch (typeOfIssue.toLowerCase()) {
            case 'bug':
                return bugIcon
                break;
            case 'improvement':
                return improvementIcon
                break;
            case 'new feature':
                return newFeatureIcon
                break;
            default:
                break;
        }
    }

    return (
        <div className="mb-2 h-14 grid grid-cols-12 border-t border-gray-200">
            <p className="mx-2 col-span-1 flex items-center text-center">
                <img className="h-4 ml-2 fill-red-500" src={typeImage(type)} />
            </p>
            <p className="mx-2 col-span-1 flex items-center">{item_key}</p>
            <p className="mx-2 col-span-1 flex items-center">{priority}</p>
            <p className="mx-2 col-span-5 flex items-center">{summary}</p>
            <p className="mx-2 col-span-1 flex items-center">{status}</p>
            <p className="mx-2 col-span-1 flex items-center">{due_date}</p>
            <p className="mx-2 col-span-1 flex items-center">{assignee}</p>
            <p className="mx-2 col-span-1 flex items-center">{reporter}</p>
        </div>
    )
}

export default Issue;