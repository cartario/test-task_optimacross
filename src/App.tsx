import React from 'react';
import OldApp from './components/old/oldApp';
import './App.css';
import './Optimacross.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        {/* <OldApp/>/ */}
        <div className="board">
          <div className="data">

            <div className="data__col list">

              <p className="list__item">Root</p>
              <ul>
                <li>
                  <p className="list__item list__item--level_1">Level-1</p>
                  <ul>
                    <li className="list__item list__item--level_2">Level-2</li>
                  </ul>
                </li>
              </ul>

              <p className="list__item">Root</p>
              <ul>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>   
                  <ul>
                    <li className="list__item list__item--level_2">Level-2</li>
                    <li className="list__item list__item--level_2">Level-2</li>
                    <li className="list__item list__item--level_2">Level-2</li>
                    <li className="list__item list__item--level_2">Level-2</li>
                  </ul>               
                </li>
              </ul>

              <p className="list__item">Root</p>
              <ul>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
              </ul>

              <p className="list__item">Root</p>
              <ul>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
              </ul>

              <p className="list__item">Root</p>
              <ul>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
              </ul>

              <p className="list__item">Root</p>
              <ul>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
                <li className="list__label">
                  <p className="list__item list__item--level_1">Level-1</p>                  
                </li>
              </ul>


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
