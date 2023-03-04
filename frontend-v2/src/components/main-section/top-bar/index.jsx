import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '../../../static/img/SearchIcon.png'
import SortIcon from '../../../static/img/SortIcon.png'
import ShareIcon from '../../../static/img/ShareIcon.png'
import FilterTag from './filterTag';

export default function TopBar() {
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();

    const paramsArray = [];
    params.get('active') && paramsArray.push({name: 'active'});
    params.get('assigned_to_me') && paramsArray.push({name: 'assigned_to_me'});
    params.get('reported_by_me') && paramsArray.push({name: 'reported_by_me'});
    params.get('resolved') && paramsArray.push({name: 'resolved'});
    console.log(paramsArray);

    return (
        <div>
            <div className='flex justify-between px-6 items-center h-[3.06rem] border-b border-[#515151] bg-[#1C1D21] '>
        
                <div className='flex gap-2'>
                    { paramsArray.map(param => (
                        <FilterTag paramName={param.name} />
                    ))}
                    <div className='border px-2 py-1 rounded border-dashed border-[#656565]'>
                        <p>+ Filter</p>
                    </div>
                </div>

                <div className='flex gap-2'>              
                    <div className='flex items-center gap-1 border px-2 py-1 rounded border-[#656565]'>
                        <img src={SearchIcon} className='w-2.5 h-2.5'/>
                        <p>Search</p>
                    </div>
                    <div className='flex items-center gap-1 border px-2 py-1 rounded border-[#656565]'>
                        <img src={SortIcon} className='w-3 h-3'/>
                        <p>Sort</p>
                    </div>
                    <div className='flex items-center gap-1 border px-2 py-1 rounded border-[#656565]'>
                        <img src={ShareIcon} className='w-2.5 h-3'/>
                    </div>
                </div>
            </div>
        </div>
    )
}