import WriteNewIcon from '../../../static/img/WriteNewIcon.png'
import { useState } from 'react'
import CreateIssueSheet from '../../sheets/CreateIssueSheet';

export default function NewIssueButtonSection() {
    const [showSheet, setShowSheet] = useState(false);

    return (
        <>
            <div>
                <div className="flex justify-center items-center h-14">
                    <div 
                        onClick={() => setShowSheet(true)} 
                        className="flex justify-start items-center mx-4 w-full border border-[#87888b] rounded px-3 h-1/2 gap-2 bg-platinum-secondary hover:bg-platinum-tertiary cursor-pointer"
                    >
                        <img src={WriteNewIcon} className="h-3 w-3"/>   
                        <p className="text-white">New Issue</p>
                    </div>
                </div>
            </div>
            { showSheet &&
                <CreateIssueSheet
                    onClick={() => setShowSheet(!showSheet)}
                    onClose={() => setShowSheet(false)}
                />
            }
        </>
    )
}