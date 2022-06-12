import React, {useEffect} from 'react';
import OldApp from './components/old/oldApp';
import './App.css';
import './Optimacross.css';
import {getDataAsync, selectParentEntityLongIds, selectLabels} from './features/optimacross/optimaSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';

function App() {
  const parentEntityLongIds = useAppSelector(selectParentEntityLongIds);
  const labels = useAppSelector(selectLabels);
  const dispatch = useAppDispatch();
  
  

  useEffect(()=>{    
    dispatch(getDataAsync());
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">        
        {/* <OldApp/>/ */}
        <div className="board">
          <div className="data">

            <div className="data__col list">

              {parentEntityLongIds.map((parentId, index) => {
                
                if(parentId===-1){
                  return (
                    <>
                      <p className="list__item list__item--level_top">{index}-{labels[index]}</p>

                      <ul>
                        <li>
                          <p className="list__item list__item--level_1">Level-1</p>
                          <ul>
                            <li className="list__item list__item--level_2">Level-2</li>
                          </ul>
                        </li>
                      </ul>

                      
                    </>
                  )
                }
                
              })}

              {/* <p className="list__item list__item--level_top">Root</p>
              <ul>
                <li>
                  <p className="list__item list__item--level_1">Level-1</p>
                  <ul>
                    <li className="list__item list__item--level_2">Level-2</li>
                  </ul>
                </li>
              </ul> */}


            </div>

            <div className="data__col info">
              <ul className="info__list">
                <li className="info__item">Label: X</li>
                <li className="info__item">Id: X</li>
                <li className="info__item">ParentId: X</li>
              </ul>              
            </div>
            
          </div>          

          <div className="controls">
            <button className="controls__btn controls__btn--apply">Apply</button>
            <button className="controls__btn controls__btn--refresh">Refresh</button>
            <button className="controls__btn controls__btn--remove">Remove</button>
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;
