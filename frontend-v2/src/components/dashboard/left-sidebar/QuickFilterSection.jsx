import LightningIcon from '../../../static/img/LightningIcon.png'
import PersonIcon from '../../../static/img/PersonIcon.png'
import ReportIcon from '../../../static/img/ReportIcon.png'
import DoneIcon from '../../../static/img/DoneIcon.png'
import ArchiveIcon from '../../../static/img/ArchiveIcon.png'
import { Link } from 'react-router-dom'


export default function QuickFilterSection() {
    return (
        <div>
            <div className='flex flex-col justify-center items-start mb-2.5'>
                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={LightningIcon} className='h-4 w-3' />
                    </div>
                    <Link to='?active=true'>
                        <p className=''>Active</p>
                    </Link>
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={PersonIcon} className='h-3 w-3' />
                    </div>
                    <Link to='?assigned_to_me=true'>
                        <p className=''>Assigned to me</p>
                    </Link>
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={ReportIcon} className='h-3 w-3' />
                    </div>
                    <Link to='?reported_by_me=true'>
                        <p className=''>Reported by me</p>
                    </Link>
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={DoneIcon} className='h-3 w-3' />
                    </div>
                    <Link to='?resolved=true'>
                        <p className=''>Resolved</p>
                    </Link>
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={ArchiveIcon} className='h-3 w-3' />
                    </div>
                    <div>
                        <p className=''>Archived</p>
                    </div>
                </div>
            </div>
            <hr className='border-[#303135]' />
        </div>
    )
}