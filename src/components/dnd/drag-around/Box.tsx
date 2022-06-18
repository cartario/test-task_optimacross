import { useDrag } from 'react-dnd'
import { ItemTypes } from '../Constants'
import * as CSS from 'csstype';

const style: CSS.Properties = {
  position: 'absolute',
  width: '100px',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

type Box = { 
  title: string, 
  top: number,
  left: number,
}

const BoxView = ({left, top, title }: Box) => {
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.DRAG_AROUND,
    item: {left, top}, //передаю пропсы внутрь dnd
    collect: (monitor)=>{
      return {
        isDragging: !!monitor.isDragging()
      }
    }
  }, [left, top, title])

  const opacity = isDragging ? 0.5 : 1; 

  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top, opacity }}
      data-testid="box"
    >
      {/* {title} */}
      top - {top}
      left - {left}
    </div>
  )
}

export default BoxView;
