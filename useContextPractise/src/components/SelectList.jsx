import { useEffect, useState } from "react";

export default function SelectList() {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([])
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function getItems(){
      setStatus('loading');
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10'); // Fetches the first 10 posts from the placeholder
        if (!response.ok){
          throw new Error(`Request failed with status ${response.status}`); // if response not 'ok' it thorws an error with the status code which jumps to the catch block
        }
        const data = await response.json(); // otherwise parses the JSON body
        if (!cancelled){ // if effect hasn't been cancelled, stores the items and sets status to 'ready'
          setItems(data);
          setStatus('ready');
        }
      } catch(error) {
        if (!cancelled){
          setErrorMsg(error.message);
          setStatus('error');
        }
      }
    }
    getItems() // calls the async function to fetch items

    return () => { 
      // The effect returns a cleanup function that sets cancelled = true. 
      // This runs if the component unmounts before the fetch finishes — it prevents calling setState on an unmounted component (avoiding the classic "can't perform a React state update on an unmounted component" warning/bug).
      cancelled = true;
    };
  },[]);

  const handleSelect = (id) => {
    setSelectedIds((prev)=>{
      const next = [...prev];
      if (next.includes(id)) {
        const index = next.indexOf(id);
        next.splice(index, 1);
      } else {
        next.push(id);
      }
      return next;
    })
  }

  const selectAll = () => setSelectedIds(items.map(item => item.id));
  const deselectAll = () => setSelectedIds([]);

  return (
    <>
      <h1>Select List</h1>
      {status === 'loading' && <div>Loading items…</div>}
      {status === 'error' && <div className="state-msg"> Could not load items: {errorMsg}<br /><button className="retry" onClick={() => window.location.reload()}>Try again</button></div>}
      {status === 'ready' && (
        <div>
          <p>{selectedIds.length} of {items.length} selected</p>
          <button onClick={selectAll}>Select all</button>
          <button onClick={deselectAll}>Clear</button>
          <br /><br />
            {items.map((item)=> {
              const isSelected = selectedIds.includes(item.id);
              return (                  
                <div key ={item.id} onClick={()=> handleSelect(item.id)}>
                  <input type="checkbox" checked={isSelected} readOnly /> {item.title}
                </div>               
              )
            })}
        </div>

      )}
    </>
  );
}