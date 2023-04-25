import { useNavigate } from 'react-router-dom'
import SearchIcon from '../../../static/img/SearchIcon.png'
import SortIcon from '../../../static/img/SortIcon.png'
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
        params.delete('sort_by_priority');
        params.delete('sort_by_due_date');

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
            <div className='flex justify-between px-6 items-center h-[3.06rem] border-b border-platinum-tertiary bg-platinum-main '>
        
                <div className='flex gap-2'>
                    { paramsArray.map(param => (
                        <FilterTag paramName={param.name} />
                    ))}
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
                        <select onChange={handleSortChange} className='h-full bg-platinum-main'>
                            <option disabled selected className='hidden'>Sort</option>
                            <option value="">None</option>
                            <option value="sort_by_priority=DESC" >{`Priority (High to Low)`}</option>
                            <option value="sort_by_priority=ASC" >{`Priority (Low to High)`}</option>
                            <option value="sort_by_due_date=DESC" >{`Due Date (Nearest)`}</option>
                            <option value="sort_by_due_date=ASC" >{`Due Date (Furthest)`}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}