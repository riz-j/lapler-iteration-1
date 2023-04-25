import LightningIcon from '../../../static/img/LightningIcon.png'
import PersonIcon from '../../../static/img/PersonIcon.png'
import ReportIcon from '../../../static/img/ReportIcon.png'
import DoneIcon from '../../../static/img/DoneIcon.png'
import ArchiveIcon from '../../../static/img/ArchiveIcon.png'
import { useNavigate } from 'react-router-dom'


export default function QuickFilterSection() {
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex flex-col justify-center items-start mb-2.5'>
                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={LightningIcon} className='h-4 w-3' />
                    </div>
                    <button onClick={() => {
                        params.delete('resolved');
                        params.get('active') === null &&
                            params.append('active', true);
                        navigate(`?${params.toString()}`);
                    }}>
                        <p>Active</p>
                    </button>
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={PersonIcon} className='h-3 w-3' />
                    </div>
                    <button onClick={() => {
                        params.get('assigned_to_me') === null &&
                            params.append('assigned_to_me', true);
                        navigate(`?${params.toString()}`);
                    }}>
                        <p className=''>Assigned to me</p>
                    </button>
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={ReportIcon} className='h-3 w-3' />
                    </div>
                    <button onClick={() => {
                        params.get('reported_by_me') === null &&
                            params.append('reported_by_me', true);
                        navigate(`?${params.toString()}`);
                    }}>
                        <p className=''>Reported by me</p>
                    </button>
                </div>

                <div className='flex items-center justify-center gap-2 mx-4 my-1'>
                    <div>
                        <img src={DoneIcon} className='h-3 w-3' />
                    </div>
                    <button onClick={() => {
                        params.delete('active');
                        params.get('resolved') === null &&
                            params.append('resolved', true);
                        navigate(`?${params.toString()}`);
                    }}>
                        <p className=''>Resolved</p>
                    </button>
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
            <hr className='border-platinum-quarternary' />
        </div>
    )
}