import DividerSideBar from './SideBarComponents/DividerSidebar';
import SideBarElement from './SideBarComponents/SideBarElement'

import settingsIcon from './../icons/settings.svg'
import archiveIcon from './../icons/archive.svg'
import doneIcon from './../icons/done.svg'
import reportedByMeIcon from './../icons/reportme.svg' 
import assignedToMeIcon from './../icons/assignme.svg'
import openIssuesIcon from './../icons/openissues.svg'

const SideBar = () => {
    return (
        <div className="w-72 h-screen pl-7 inline-block float-left border-gray-300 border">
            <div className="py-16">
                <h1 className="flex">Mars Project</h1>
            </div>

                <DividerSideBar />

            <SideBarElement name="Open Issues" icon={openIssuesIcon} />
            <SideBarElement name="Assigned to me" icon={assignedToMeIcon} />
            <SideBarElement name="Reported by me" icon={reportedByMeIcon} />
            <SideBarElement name="Resolved Issues" icon={doneIcon} />

                <DividerSideBar />

            <SideBarElement name="Archived Issues" icon={archiveIcon} />
            
                <DividerSideBar />
    
            <SideBarElement name="Settings" icon={settingsIcon} />
        </div>
    )
}

export default SideBar;