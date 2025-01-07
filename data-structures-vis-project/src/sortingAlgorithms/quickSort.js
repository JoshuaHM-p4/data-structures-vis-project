export const quickSort = async (array, setArr, setComparing, setSortedIndices, delayRef) => {
  let arrCopy = [...array];

  const partition = async (low, high) => {
    let pivot = arrCopy[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setComparing([j, high]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
      if (arrCopy[j] < pivot) {
        i++;
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        setArr([...arrCopy]);
      }
      setComparing([-1, -1]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
    }
    [arrCopy[i + 1], arrCopy[high]] = [arrCopy[high], arrCopy[i + 1]];
    setArr([...arrCopy]);
    return i + 1;
  };

  const quickSortRecursive = async (low, high) => {
    if (low < high) {
      let pi = await partition(low, high);
      await quickSortRecursive(low, pi - 1);
      await quickSortRecursive(pi + 1, high);
    }
  };

  await quickSortRecursive(0, arrCopy.length - 1);
  setSortedIndices((prev) => [...prev, ...Array.from({ length: arrCopy.length }, (_, i) => i)]);
  setComparing([-1, -1]);
  setArr([...arrCopy]);
};
