export const insertionSort = async (array, setArr, setComparing, setReferenceIndex, setSortedIndices, delayRef) => {
  let arrCopy = [...array];
  let n = arrCopy.length;

  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, delayRef.current));
  };

  for (let i = 1; i < n; i++) {
    let currentValue = arrCopy[i];
    let j = i - 1;

    setReferenceIndex([i]);
    let localReferenceIndex = i;
    await delay();

    let lastComparedIndex = [i, i - 1];

    while (j >= 0 && arrCopy[j] > currentValue) {
      if (localReferenceIndex === j + 1) {
        setReferenceIndex([]);
        setComparing([j, j + 1]);
        await delay();
        setReferenceIndex([i]);
      } else {
        setComparing([j, j + 1]);
        await delay();
      }

      [arrCopy[j + 1], arrCopy[j]] = [arrCopy[j], arrCopy[j + 1]];
      j--;

      lastComparedIndex = [j, j + 1];
      setArr([...arrCopy]);
      await delay();
    }

    if (lastComparedIndex[0] === localReferenceIndex) {
      setReferenceIndex([]);
      setComparing(lastComparedIndex);
      await delay();
      setReferenceIndex([i]);
    } else {
      setComparing(lastComparedIndex);
      await delay();
    }

    setReferenceIndex([]);
    setComparing([-1, -1]);
  }

  setArr([...arrCopy]);
  setSortedIndices([...Array(n).keys()]);
  setComparing([-1, -1]);
  setReferenceIndex([]);
};
