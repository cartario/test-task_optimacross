import { ItemTypes } from '../Constants';
import {useDrop} from 'react-dnd';
import type * as CSS from 'csstype';

const style: CSS.Properties = {
  height: '12rem',
  width: '12rem',  
  color: 'white',
  border: '1px dashed red',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  
}

const Bin = () => {  
  const [{isOver, canDrop}, drop] = useDrop({
    accept: ItemTypes.SINGLE_TARGET,
    drop: (dragItem) => {
      
      return { name: 'Bin' }
    },    
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
      <div 
      ref={drop}
      style={style}>
        Bin
      </div>
    )
};

export default Bin;