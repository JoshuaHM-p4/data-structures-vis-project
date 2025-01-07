export const selectionSort = async (array, setArr, setRedTube, setYellowTube, setSwapping, setGreenTube, delayRef) => {
  let arrCopy = [...array];
  let n = arrCopy.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      setRedTube([i, minIndex]);
      setYellowTube([j]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
      if (arrCopy[j] < arrCopy[minIndex]) {
        minIndex = j;
      }
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
    }
    if (minIndex !== i) {
      setRedTube([i, minIndex]);
      setSwapping([i, minIndex]);
      setYellowTube([]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
      let temp = arrCopy[i];
      arrCopy[i] = arrCopy[minIndex];
      arrCopy[minIndex] = temp;
      setArr([...arrCopy]);
      setSwapping([]);
    }
    setGreenTube((prev) => [...prev, i]);
  }
  setGreenTube((prev) => [...prev, n - 1]);
  setRedTube([]);
  setYellowTube([]);
};
