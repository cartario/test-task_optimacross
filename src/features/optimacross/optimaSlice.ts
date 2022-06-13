import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchData } from './optimaAPI';
import { getParentChildrenMap, getItems } from '../../utils';
import { OptimaState } from '../../types';

const initialState: OptimaState = {
  value: 0,
  status: 'idle',
  content: {
    parentEntityLongIds: [],
    labels: [],
    entityLongIds: [],  
    entityLongIdsMap: {}  
  },
  items: null,
  currentItem: null  
};

export const getDataAsync = createAsyncThunk(
  'optima/fetchData',
  async () => {
    const response = await fetchData();   
    const raw = response.entityLabelPages[0];

    const entityLongIdsMap: Record<string, number> = {}
    
    raw.entityLongIds.forEach((each: number, i:number)=>{
      entityLongIdsMap[each] =  i;
    });

    const parentChildren = getParentChildrenMap(raw);
    const items = getItems(parentChildren[0], parentChildren);   
    
    return {raw: {...response.entityLabelPages[0], entityLongIdsMap}, items };
  }
);

export const optimaSlice = createSlice({
  name: 'optima',
  initialState,  
  reducers: {    
    setCurrentItem: (state, action: PayloadAction<number>) => {      
      const content = current(state).content;
      const idx = content.entityLongIdsMap[action.payload];
      const label = content.labels[idx];
      const parentId = content.parentEntityLongIds[idx];      

      state.currentItem = {
        label,
        id: action.payload,
        parentId
      };
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDataAsync.fulfilled, (state, action) => {        
        state.status = 'idle';       
        state.content = action.payload.raw;
        state.items = action.payload.items;
      })
      .addCase(getDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {setCurrentItem } = optimaSlice.actions;

export const selectStatusLoading = (state: RootState) => state.optima.status;
export const selectCount = (state: RootState) => state.optima.value;
export const selectParentEntityLongIds = (state: RootState) => state.optima.content.parentEntityLongIds;
export const selectLabels = (state: RootState) => state.optima.content.labels;
export const selectEntityLongIds = (state: RootState) => state.optima.content.entityLongIds;
export const selectEntityLongIdsMap = (state: RootState) => state.optima.content.entityLongIdsMap;
export const selectItems = (state: RootState) => state.optima.items;
export const selectCurrentItem = (state: RootState) => state.optima.currentItem;

export default optimaSlice.reducer;
