import { Link } from 'react-router-dom'
import WriteNewIcon from '../../../static/img/WriteNewIcon.png'

export default function NewIssueButtonSection() {
    return (
        <div>
            <div className="flex justify-center items-center h-14">
                <Link to='issues/new' className="flex justify-start items-center mx-4 w-full border border-[#A1A2A5] rounded px-3 h-1/2 gap-2 bg-[#26272A]">
                    <img src={WriteNewIcon} className="h-3 w-3"/>   
                    <p className="text-white">New Issue</p>
                </Link>
            </div>
        </div>
    )
}