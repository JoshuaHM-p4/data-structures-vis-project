export const heapSort = async (array, setArr, setComparing, setSortedIndices, delayRef) => {
  let arrCopy = [...array];
  let n = arrCopy.length;

  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, delayRef.current));
  };

  const heapify = async (arr, n, i, setArr, setComparing, delay) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Compare left child with root
    if (left < n && arr[left] > arr[largest]) {
      setComparing([left, largest]);
      await delay();
      largest = left;
    }

    // Compare right child with root\
    if (right < n && arr[right] > arr[largest]) {
      setComparing([right, largest]);
      await delay();
      largest = right;
    }

    // If largest is not root
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArr([...arr]);
      await delay();
      await heapify(arr, n, largest, setArr, setComparing, delay);
    }

  };
  for(let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arrCopy, n, i, setArr, setComparing, delay);
  }

  for (let i = n - 1; i > 0; i--) {
    [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];
    setArr([...arrCopy]);
    await delay();
    // Set sorted indices
    setSortedIndices((prev) => [...prev, i]);
    await heapify(arrCopy, i, 0, setArr, setComparing, delay);
  }

  setSortedIndices([...Array(n).keys()]);
  setComparing([-1, -1]);
  


};
