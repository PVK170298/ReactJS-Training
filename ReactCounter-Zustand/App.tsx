import './App.css' ;
import { useStore } from "./a";
export default function App() {
  const count = useStore((state) => state.count);
  const addCount = useStore((state) => state.addCount);
  const subCount = useStore((state) => state.subCount);
  const resetCount = useStore((state) => state.resetCount);

  return (
    <div className="App">
      <h1>Counter Application</h1>
      <button onClick={() => addCount()}>Add</button>
      <button onClick={() => subCount()}>Sub</button>
      <button onClick={() => resetCount()}>Reset</button>
      <h2>{count}</h2>
    </div>
  );
}
