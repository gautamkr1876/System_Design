import { useCallback, useRef, useState } from 'react';
import './App.css';
import InfinteScroll from './InfinteScroll';

function App() {
  const [query,setQuery] = useState();
  const [data,setData] = useState();
  const contollerRef = useRef(null);

  const handleChange = useCallback((e)=>{
    setQuery(e.target.value);
  },[])
  const renderItem = useCallback(({title}, key, ref) => <div ref ={ref} key={key}>{title}</div>)
  const getData = useCallback((query, pageNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (contollerRef.current) contollerRef.current.abort()
        contollerRef.current = new AbortController();

        const promise = await fetch('http://openlibrary.org/search.json?' + new URLSearchParams({
          q: query,
          page: pageNumber
        }), { signal: contollerRef.current.signal })

        const data = await promise.json();
        console.log(data)
        setData((prevData) => [...prevData, ...data.docs]);
        resolve()
      } catch (err) {
        console.log("error occur", data)
        reject()
      }
    })
  }, [])

  return (
    <>
    <input type='text' onChange={handleChange}/>
    <InfinteScroll 
      renderListItem={renderItem}
      getData={getData}
      listData={data}
      query={query}
    />
    </>
  );
}

export default App;
