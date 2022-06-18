import { useDrag } from 'react-dnd'
import { ItemTypes } from '../Constants'
import * as CSS from 'csstype';

const style: CSS.Properties = {
  position: 'absolute',
  width: '200px',
  height: '100px',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

type Box = { 
  title: string, 
  bottom: number,
  left: number,
}

const BoxView = ({left, bottom, title }: Box) => {
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.DRAG_AROUND,
    item: {left, bottom}, //передаю пропсы внутрь dnd
    collect: (monitor)=>{
      return {
        isDragging: !!monitor.isDragging()
      }
    }
  }, [left, bottom, title])

  const opacity = isDragging ? 0.5 : 1; 

  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, bottom, opacity }}
      data-testid="box"
    >
      {/* {title} */}
      bottom - {bottom}
      left - {left}
    </div>
  )
}

export default BoxView;
