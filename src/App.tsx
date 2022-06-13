import './App.css';
import Optima from './features/optimacross/Optima';
import OldApp from './components/old/oldApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        {/* <OldApp/> */}
        <Optima/>
      </header>
    </div>
  );
}

export default App;
