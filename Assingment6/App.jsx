import { useState } from "react";
import Counter from "./Counter";
import './App.css';

function App() {
  const [resetKey, setResetKey] = useState(0);

  function resetAll() {
    setResetKey(prev => prev + 1); // change value → notifies all counters
  }

  return (
    <div class="reset">
      <p>Counters</p>
      <button onClick={resetAll} className="reset">RESET</button>
    <div className="main">
      
      <Counter num={1} resetAll={resetKey} />
      <Counter num={2} resetAll={resetKey} />
      <Counter num={3} resetAll={resetKey} />
      <Counter num={4} resetAll={resetKey} />

    </div>
    </div>
  );
}

export default App;
