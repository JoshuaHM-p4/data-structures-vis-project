export const heapSort = async (array, setArr, setComparing, setSortedIndices, delayRef) => {
  let arrCopy = [...array];
  let n = arrCopy.length;

  const heapify = async (n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arrCopy[left] > arrCopy[largest]) {
      largest = left;
    }

    if (right < n && arrCopy[right] > arrCopy[largest]) {
      largest = right;
    }

    if (largest !== i) {
      setComparing([i, largest]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
      [arrCopy[i], arrCopy[largest]] = [arrCopy[largest], arrCopy[i]];
      setArr([...arrCopy]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
      await heapify(n, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    setComparing([0, i]);
    await new Promise((resolve) => setTimeout(resolve, delayRef.current));
    [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];
    setArr([...arrCopy]);
    await new Promise((resolve) => setTimeout(resolve, delayRef.current));
    await heapify(i, 0);
    setSortedIndices((prev) => [...prev, i]);
  }

  setSortedIndices((prev) => [...prev, 0]);
  setComparing([-1, -1]);
  setArr([...arrCopy]);
};
