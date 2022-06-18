import { ItemTypes } from './Constants';
import {useDrag} from 'react-dnd';

const Knight = () =>{
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.KNIGHT,
    collect: (monitor)=>{      
      return {
        isDragging: !!monitor.isDragging(),
      }
    }
  });
  
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}>Knight
    </div>)
};

export default Knight;