import React, { useState } from 'react';
import './Queue.css';
// import { Queue } from '../../components';



const Queue = () => {
  const [queue, setQueue] = useState([]);

  const addQueue = (name) => {
    setQueue([...queue, name]);
  }

  const removeQueue = () => {
    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
  }

  return (
    <div className="w-ful h-full pt-16">
      <h1>Queue</h1>
      <button onClick={() => addQueue(`Car ${queue.length}`)}>Add Car</button>
      <button onClick={() => removeQueue()}>Remove</button>
      <div>
        {queue.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
    </div>
  );
}

export default Queue;