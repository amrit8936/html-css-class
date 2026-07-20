import { useRef } from "react";

function App() {

  const count = useRef(0);

  function increase() {
    count.current++;
    console.log(count.current);
  }

  return (
    <div>
      <h1>Check Console</h1>

      <button onClick={increase}>
        Increase
      </button>
    </div>
  );
}

export default App;