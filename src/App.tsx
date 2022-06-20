import './App.css';
import Optima from './features/optimacross/Optima';
import OldApp from './components/old/oldApp';
import DndTutorial from './components/dnd/Dnd';
import TypescriptPractice from './components/practice/typescript';

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        {/* <OldApp/> */}
        {/* <DndTutorial/> */}
        {/* <Optima/> */}
        <TypescriptPractice/>
      </header>
    </div>
  );
}

export default App;
