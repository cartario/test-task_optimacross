import { useEffect } from 'react';
import '../../Optimacross.css';
import {
  getDataAsync, 
  selectStatusLoading,
  selectEntityLongIdsMap,
  selectLabels, 
  selectItems, 
  setCurrentItem, 
  selectCurrentItem
} from './optimaSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

function Optima() { 
  const labels = useAppSelector(selectLabels);
  const entityLongIdsMap = useAppSelector(selectEntityLongIdsMap);
  const items = useAppSelector(selectItems);
  const currentItem = useAppSelector(selectCurrentItem);
  const isLoading = useAppSelector(selectStatusLoading) === 'loading';
  const dispatch = useAppDispatch();

  useEffect(()=>{    
    dispatch(getDataAsync());
  }, [dispatch]);

  const onRefreshBtnCick = () => {
    dispatch(getDataAsync());
  } 

  const onItemClick = (id: number) => {
    dispatch(setCurrentItem(id));    
  }

  const getLabel = (id: number) => {
    return labels[entityLongIdsMap[id]]
  }

  const renderTree = (data: any, isSub?: boolean, lev?: number)=> {
    let level = lev || 0;
    let children = [];   

    for (let i in data) {
        if ((data[i].children)) {
            children.push(
                <ul className={`level-${level}`}>
                    <p 
                    onClick={()=>onItemClick(data[i].value)}
                    className={`list__item list__item--level_${level}`}>{getLabel(data[i].value)}</p>
                    {renderTree(data[i].children, true, level+1)}
                </ul>
            );
        } else {
            children.push(<li onClick={()=>onItemClick(data[i].value)} key={i} className="list__item list__item--level_2">{getLabel(data[i].value)}</li>);
        }
    }
    return <div className={`filter-body`}>{children}</div>;
  }

  const renderControls = () => {
    return (
      <div className="controls">
        <button disabled={isLoading} className="controls__btn controls__btn--apply">Apply</button>
        <button disabled={isLoading} className="controls__btn controls__btn--refresh" onClick={onRefreshBtnCick}>{isLoading ? `Refreshing` : `Refresh`}</button>
        <button disabled={isLoading} className="controls__btn controls__btn--remove">Remove</button>
      </div>
    )
  }

  const renderInfo = () => {
    return (
      <div className="data__col info">
        <ul className="info__list">
          <li className="info__item">Label: {currentItem?.label}</li>
          <li className="info__item">Id: {currentItem?.id}</li>
          <li className="info__item">ParentId: {currentItem?.parentId}</li>
        </ul>              
      </div>
    )
  }

  return (        
    <div className="board">
      <div className="data">
        <div className="data__col list">
          {renderTree(items)}
        </div>
        {renderInfo()}        
      </div>
        {renderControls()}
    </div>   
  );
}

export default Optima;
