import { useState, useEffect } from "react";
import './Counter.css';

function Counter(props) {
  const [count, setCount] = useState(0);

  function add() {
    setCount(count + 1);
  }
  function sub() {
    setCount(count - 1);
  }

  // 👇 whenever resetAll changes, reset this counter
  useEffect(() => {
    setCount(0);
  }, [props.resetAll]);

  return (
    <div className="container">
      <h2>Counter {props.num} :- {count}</h2>
      <button className="ad" onClick={add}>INC</button>
      <button className="su" onClick={sub}>DEC</button>
    </div>
  );
}

export default Counter;
