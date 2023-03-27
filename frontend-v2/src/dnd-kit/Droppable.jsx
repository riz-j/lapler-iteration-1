import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
      id: props.id,
    });
    const buttonText = isOver ? 'text-blue-800' : ''
    const buttonBg = isOver ? 'bg-green-300' : 'bg-yellow-300'
    const _transform = {
      transition: 'transform: 2s'
    }


return (
    <div 
        ref={setNodeRef} 
        style={_transform}
        className={`w-56 px-5 py-3  border-2 border-black ${ buttonText } ${ buttonBg } `}
    >
      {props.children}
    </div>
  );
}