export const shellSort = async (array, setArr, setRedTube, setGreenTube, delayRef) => {
  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, delayRef.current));
  };

  let arrCopy = [...array];
  let n = arrCopy.length;
  let interval = 1;

  // Calculate initial interval or gap
  while (interval < n / 3) {
    interval = interval * 3 + 1;
  }

  while (interval > 0) {
    for (let outer = interval; outer < n; outer++) {
      let inner = outer;
      setRedTube([inner, inner - interval]); // Highlight elements being compared
      await delay();
      // Shift elements towards right and swap for better visualization
      while (inner >= interval && arrCopy[inner - interval] > arrCopy[inner]) {
        setRedTube([inner, inner - interval]); // Highlight elements being compared
        await delay();
        
        // Swap elements
        [arrCopy[inner], arrCopy[inner - interval]] = [arrCopy[inner - interval], arrCopy[inner]];
        setArr([...arrCopy]);
        // Highlight sorted elements
        await delay();
        
        inner -= interval;
      }

      // Clear highlights
      setRedTube([]);
    }

    // Calculate next interval
    interval = (interval - 1) / 3;
  }

  // Mark the entire array as sorted
  setGreenTube([...Array(n).keys()]);
  setRedTube([]);
};