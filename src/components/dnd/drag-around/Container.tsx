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
  bottom: number,
  left: number,
  title: string
}

const initialState: State = {
  bottom: 0, left: 0, title: 'Drag me too'
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
  const moveBox = (delta: any, dragItem: {bottom: number, left: number}, element: any) => { // action in store    
    const {dragBoundingClientRect, dropBoundingClientRect} = element;

    const middleDropPosition = {
      x: dropBoundingClientRect.x + dropBoundingClientRect.width / 2,
      y: dropBoundingClientRect.y + dropBoundingClientRect.height / 2
    };
    
    const isLeftPosition = middleDropPosition.x > dragItem.left + delta.x;
    const isTopPosition = middleDropPosition.y > dragItem.bottom + delta.y;

    const topRight = isTopPosition&&!isLeftPosition;
    const topLeft = isTopPosition&&isLeftPosition;
    
    switch (true) {
      case (topRight):        
        setBox({
          ...box,
          bottom: dropBoundingClientRect.height - dragBoundingClientRect.height,
          left: dropBoundingClientRect.width - dragBoundingClientRect.width
        })
        break;
      case (topLeft):       
        setBox({...box, bottom: dropBoundingClientRect.height - dragBoundingClientRect.height, left: 0})
        break;      
      default:
        setBox({
          ...box,
          bottom: 0,
          left: 0
        })
    }
  }

  const [, drop] = useDrop({
    accept: ItemTypes.DRAG_AROUND,
    drop: (dragItem: {left: number, bottom: number}, monitor)=>{ //слушатель события
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