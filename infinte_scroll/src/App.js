import { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [queary,setQueary] = useState();
  const handleChange = useCallback((e)=>{
    setQueary(e.target.value);
  },[])
  return (
    <>
    <input type='text' onChange={handleChange}/>
    </>
  );
}

export default App;
