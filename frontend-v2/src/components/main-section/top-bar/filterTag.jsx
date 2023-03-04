import { useNavigate } from 'react-router-dom';
import xIcon from '../../../static/img/xIcon.png'
import { parseParamName } from '../../../utils/paramNameHandler';

export default function FilterTag({paramName}) {
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const parsedParamName = parseParamName(paramName);

    const handleRemoveFilter = () => {
        params.delete(paramName);
        navigate(`?${params.toString()}`);
    }

    return (
        <div key={paramName} className='flex items-center jusitfy-center gap-2 border px-2 py-1 rounded border-[#656565]'>
            <p>{parsedParamName}</p>
            <button onClick={handleRemoveFilter} className='flex justify-center items-center h-full'>
                <img src={xIcon} className='w-2 h-2'/>
            </button>
        </div>
    )
}