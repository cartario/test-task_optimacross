import { ItemTypes } from '../Constants';
import {useDrop, XYCoord} from 'react-dnd';
import {memo, useState, useEffect, useRef, RefObject} from 'react';
import * as CSS from 'csstype';
import Box from './Box';

const styles: CSS.Properties = {
  width: '80%',
  height: '500px',
  border: '1px solid black',
  position: 'relative',
}

type State = {
  top: number,
  left: number,
  title: string
}

const initialState: State = {
  top: 180, left: 20, title: 'Drag me too'
}

const initialStateElement: any = {
  dropBoundingClientRect: {},
  dragBoundingClientRect: {}
}

const Container = () => {  
  //store 
  const [box, setBox] = useState(initialState);
  const [element, setElement] = useState(initialStateElement);

  const boxRef: any = useRef();

  //delta type is -  XYCoord | null
  const moveBox = (delta: any, dragItem: {top: number, left: number}, element: any) => { // action in store
    const left = Math.round(dragItem.left + delta.x) < 0 ? 0 : Math.round(dragItem.left + delta.x)
    const top = Math.round(dragItem.top + delta.y) < 0 ? 0 : Math.round(dragItem.top + delta.y)
    
    const {dragBoundingClientRect, dropBoundingClientRect} = element;
    const isBottomPosition = dragBoundingClientRect.top + delta.y > dropBoundingClientRect.top + dropBoundingClientRect.height / 2;
    const isLeftPosition = dropBoundingClientRect.left + dropBoundingClientRect.width / 2 - delta.x > dragBoundingClientRect.left;

    const topRight = !isBottomPosition&&!isLeftPosition;
    const topLeft = !isBottomPosition&&isLeftPosition;
    
    switch (true) {
      case (topRight):
        setBox({
          ...box,
          top: 0,
          left: dropBoundingClientRect.width - dragBoundingClientRect.width
        })
        break;
      case (topLeft):
        setBox({...box, top: 0, left: 0})
        break;      
      default:
        setBox({
          ...box,
          top: dropBoundingClientRect.height - dragBoundingClientRect.height,
          left: 0
        })
    }
  }

  const [, drop] = useDrop({
    accept: ItemTypes.DRAG_AROUND,
    drop: (dragItem: {left: number, top: number}, monitor)=>{ //слушатель события
      const delta = monitor.getDifferenceFromInitialOffset();
      moveBox(delta, dragItem, element); //callback      
    }
  }, [moveBox]);  

  useEffect(()=>{    
    setElement({
      dropBoundingClientRect: boxRef.current.getBoundingClientRect(),
      dragBoundingClientRect: boxRef.current.firstElementChild.getBoundingClientRect()
    });
    drop(boxRef.current)
  }, [drop, setElement]);  

  return (
      <div 
        ref={boxRef}        
        style={styles}
      >
          <Box          
            {...box}
          />      
      </div>
    )
};

export default memo(Container);