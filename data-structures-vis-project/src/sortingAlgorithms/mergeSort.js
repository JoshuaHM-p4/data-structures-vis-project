export const mergeSort = async (array, setArr, setComparing, setSortedIndices, delayRef) => {
  const delay = async (decreaseDelay = 1) => {
    await new Promise((resolve) => setTimeout(resolve, delayRef.current / decreaseDelay));
  };

  const merge = async (arr, start, mid, end) => {
    let leftArray = arr.slice(start, mid + 1);
    let rightArray = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] <= rightArray[j]) {
        setComparing([k]);
        await delay();
        arr[k] = leftArray[i];
        i++;
      } else {
        setComparing([k]);
        await delay();
        arr[k] = rightArray[j];
        j++;
      }
      setArr([...arr]);
      setComparing([-1, -1]);
      await delay();
      k++;
    }

    while (i < leftArray.length) {
      setComparing([k]);
      await delay();
      arr[k] = leftArray[i];
      i++;
      k++;
      setArr([...arr]);
      setComparing([-1, -1]);
      await delay();
    }

    while (j < rightArray.length) {
      setComparing([k]);
      await delay();
      arr[k] = rightArray[j];
      j++;
      k++;
      setArr([...arr]);
      setComparing([-1, -1]);
      await delay();
    }
    setComparing([-1, -1]);
  };

  const mergeRecursive = async (arr, start, end) => {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);
    await mergeRecursive(arr, start, mid);
    await mergeRecursive(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const arrCopy = [...array];
  await mergeRecursive(arrCopy, 0, arrCopy.length - 1);

  for (let i = 0; i < array.length; i++) {
    setSortedIndices((prev) => [...prev, i]);
    await delay(2);
  }

  setComparing([-1, -1]);
  setArr([...arrCopy]);
};
