import './App.css';

import { UseState } from './UseState';
import { UseReducer } from './useReducer';

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <UseReducer name="Use Reducer" />
    </div>
  );
}

export default App;
