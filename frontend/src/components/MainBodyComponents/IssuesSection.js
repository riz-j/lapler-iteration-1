import { useEffect, useState } from "react"

import IssuesJson from "../../data/issues.json"
import Issue from "./Issue"

const IssuesSection = () => {
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    
    const handleTypeDropdownChange = (e) => {
        setTypeFilter(e.target.value)
    }

    const handleStatusDropdownChange = (e) => {
        console.log(e.target.value)
        setStatusFilter(e.target.value)
    }

    const TypeDropdown = 
        <select onChange={handleTypeDropdownChange}>
            <option className="p-10">All</option>
            <option className="p-10">Bug</option>
            <option className="p-10">Improvement</option>
            <option className="p-10">New Feature</option>
        </select>
    
    const StatusDropdown = 
        <select onChange={handleStatusDropdownChange}>
            <option>All</option>
            <option>Waiting</option>
            <option>Doing</option>
            <option>Done</option>
        </select>

    const filterType = () => {
        if(["Bug", "Improvement", "New Feature"].includes(typeFilter)) {
            return IssuesJson.filter(item => item.type == typeFilter);
        } 
        return IssuesJson
    }

    const filterStatus = () => {
        if(["Waiting", "Doing", "Done"].includes(statusFilter)) {
            console.log("yey")
            return filterType().filter(item => item.status == statusFilter)
        }
        return filterType()
    }

    const IssuesList = filterStatus().map(item => {
        return (
            <Issue 
                key={item.id}
                item_key={item.key}
                type={item.type} 
                priority={item.priority}
                summary={item.summary}
                status={item.status}
                due_date={item.due_date}
                assignee={item.assignee}
                reporter={item.reporter}
            />
        )})

    // ----------------------------------------------------------------------------------------------------------------------------

    return (
        <div>
            <div className="mx-10 mt-24">
                {TypeDropdown}
                {StatusDropdown}
            </div>
            
            <div className="mx-10 bg-white rounded-lg border border-gray-100">
                <div className="grid grid-cols-12">
                    <p className="col-span-1 mx-2">Type</p>
                    <p className="col-span-1 mx-2">Key</p>
                    <p className="col-span-1 mx-2">Priority</p>
                    <p className="col-span-5 mx-2">Summary</p>
                    <p className="col-span-1 mx-2">Status</p>
                    <p className="col-span-1 mx-2">Due Date</p>
                    <p className="col-span-1 mx-2">Assignee</p>
                    <p className="col-span-1 mx-2">Reporter</p>
                </div>
                {IssuesList}
            </div>
        </div>
    )
}

export default IssuesSection;