import { ItemTypes } from '../Constants';
import {useDrag} from 'react-dnd';
import {memo} from 'react';
import Box from './Box';
import Bin from './Bin';

const Container = () => {  
  
  return (
      <div>
        <Bin/>
        <Box/>
      </div>
    )
};

export default memo(Container);