import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '../../../static/img/SearchIcon.png'
import SortIcon from '../../../static/img/SortIcon.png'
import ShareIcon from '../../../static/img/ShareIcon.png'
import FilterTag from './filterTag';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearchState } from '../../../redux/searchSlice';

export default function TopBar() {
    const dispatch = useDispatch();
    const searchState = useSelector(state => state.search.searchState);
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();

    const paramsArray = [];
    params.get('active') && paramsArray.push({name: 'active'});
    params.get('assigned_to_me') && paramsArray.push({name: 'assigned_to_me'});
    params.get('reported_by_me') && paramsArray.push({name: 'reported_by_me'});
    params.get('resolved') && paramsArray.push({name: 'resolved'});
    console.log(paramsArray);

    const handleSearchClick = () => {
        dispatch(toggleSearchState());
    }

    const handleSortChange = (e) => {
        if (params.get('sort_by_priority') !== null) {
            params.delete('sort_by_priority');
        }

        if (e.target.value === null || e.target.value === undefined || e.target.value === "") {
            navigate(`?${params.toString()}`);
            return;
        } 

        const parts = (e.target.value).split('=');
        params.append(parts[0], parts[1]);
        navigate(`?${params.toString()}`);
    }

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
                    <button 
                        onClick ={handleSearchClick} 
                        className={`flex items-center gap-1 border px-2 py-1 rounded border-[#656565]
                                    ${searchState ? 'bg-gray-700' : 'bg-transparent'}`}
                    >
                        <img src={SearchIcon} className='w-2.5 h-2.5'/>
                        <p>Search</p>
                    </button>
                    <div className='flex items-center gap-1 border px-2 py-1 rounded border-[#656565]'>
                        <img src={SortIcon} className='w-3 h-3'/>
                        <select onChange={handleSortChange} className='h-full bg-[#1C1D21]'>
                            <option disabled selected className='hidden'>Sort</option>
                            <option value="">None</option>
                            <option value="sort_by_priority=DESC" >{`Priority (High to Low)`}</option>
                            <option value="sort_by_priority=ASC" >{`Priority (Low to High)`}</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-1 border px-2 py-1 rounded border-[#656565]'>
                        <img src={ShareIcon} className='w-2.5 h-3'/>
                    </div>
                </div>
            </div>
        </div>
    )
}