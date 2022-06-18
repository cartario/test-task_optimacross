import { ItemTypes } from '../Constants';
import {useDrag} from 'react-dnd';
import * as CSS from 'csstype';

const style: CSS.Properties = {
  width: '50px',
  border: '1px dashed gray',
  backgroundColor: 'white',  
  cursor: 'move',
}

const Box = () => {  
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.SINGLE_TARGET,
    item: { name: 'BinDragHere' },
    end: (dragItem, monitor) => {
      monitor.getInitialClientOffset();
      const dropResult = monitor.getDropResult()
      debugger;
    },
    collect: (monitor)=>({
      isDragging: !!monitor.isDragging()
    })
  })

  return (
      <div 
        style={{...style, opacity: isDragging ? 0.5 : 1}}
        ref={drag}>
        Box
      </div>
    )
};

export default Box;