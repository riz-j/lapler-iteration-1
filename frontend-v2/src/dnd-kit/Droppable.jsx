import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
      id: props.id,
    });
    const buttonBg = isOver ? 'bg-gray-700' : ''
    const _transform = {
      transition: 'transform: 2s'
    }


return (
    <div 
        ref={setNodeRef} 
        style={_transform}
        className={`${ buttonBg } py-2`}
    >
      {props.children}
    </div>
  );
}