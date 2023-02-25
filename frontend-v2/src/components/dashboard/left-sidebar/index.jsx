import { Link } from "react-router-dom"
import MembersSection from "./MembersSection"
import NewIssueButtonSection from "./NewIssueButtonSection"
import ProfileSection from "./ProfileSection"
import ProjectNameHeader from "./ProjectNameHeader"
import QuickFilterSection from "./QuickFilterSection"

export default function LeftSidebar() {
    return (
        <div className='flex-none bg-[#1C1D21] w-56 h-screen text-base border-r border-[#515151]'>
            <div>
                <ProjectNameHeader />
                <NewIssueButtonSection />
                <QuickFilterSection />
                <MembersSection />
                <ProfileSection />
            </div>
        </div>
    )
}



// OLD CODE:

        // <div className='bg-purple-300 w-80 hidden md:flex flex-col pt-4'>
        // <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>All states</p>
        // <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Some states</p>
        // <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2'>Few states</p>
        // <Link to='/'>
        // <p className='bg-blue-200 rounded-lg px-5 py-2 border-b-2 mt-96'>Home</p>
        // </Link>
        // </div>