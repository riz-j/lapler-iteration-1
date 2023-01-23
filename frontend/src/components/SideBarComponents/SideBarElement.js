

const SideBarElement = ({name, icon}) => {
    return (
        <div className="flex">
            <img className="w-8 pr-3 object-contain" src={icon} />
            <h2 className="flex my-3">{name}</h2>
        </div>
    )
}

export default SideBarElement;