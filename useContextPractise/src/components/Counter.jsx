import { useState, useEffect } from 'react';

export default function Counter() {
  const [secCount, setSecCount] = useState(0);
  const [minCount, setMinCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setSecCount(c => c + 1);
      if ((secCount + 1) % 60 === 0) {
        setMinCount(m => m + 1);
        setSecCount(0);
      }
    }

    const secIntervalId = setInterval(onTick, 1000);
    return () => {
      clearInterval(secIntervalId);

    };
  }, [secCount]);

  return (
    <>
        <h1>Counter increments per minute and second</h1>
        <h2 style={{ color: 'violet' }}>{minCount} : {secCount}</h2>
    </>
  )
}