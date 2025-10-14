import PathMemoryGame from "../components/pages/PathMemoryGame";
import HomePage from "../components/pages/HomeScreen";
import { useState } from "react";

function App() {
  const [showMemoryGame, setShowMemoryGame] = useState(true);
  return (
    <div>
      <div style={{position: 'fixed', top: 12, left: 12, zIndex: 50}}>
        <button
          onClick={() => setShowMemoryGame(!showMemoryGame)}
          style={{
            background: '#111827', color: '#e5e7eb', border: '1px solid rgba(255,255,255,0.1)',
            padding: '6px 10px', borderRadius: 8, fontSize: 12
          }}
        >
          {showMemoryGame ? 'Show On-chain UI' : 'Show Memory Game'}
        </button>
      </div>
      {showMemoryGame ? <PathMemoryGame /> : <HomePage />}
    </div>
  );
}

export default App;