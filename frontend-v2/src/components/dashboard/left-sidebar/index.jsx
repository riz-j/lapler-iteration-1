import MembersSection from "./MembersSection"
import NewIssueButtonSection from "./NewIssueButtonSection"
import ProfileSection from "./ProfileSection"
import ProjectNameHeader from "./ProjectNameHeader"
import QuickFilterSection from "./QuickFilterSection"

export default function LeftSidebar() {
    return (
        <div className='flex-none bg-platinum-main w-56 h-screen text-base border-r border-platinum-tertiary'>
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



