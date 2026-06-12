import { useState } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">WellNest is Alive!</h1>
        <p className="text-gray-600 mb-4">Count: {count}</p>
        <button onClick={() => setCount(c => c+1)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Click me</button>
      </div>
    </div>
  );
}
