export const shellSort = async (array, setArr, setComparing, setSortedIndices, delayRef) => {
  let arrCopy = [...array];
  let n = arrCopy.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = arrCopy[i];
      let j = i;
      while (j >= gap && arrCopy[j - gap] > temp) {
        setComparing([j, j - gap]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current));
        arrCopy[j] = arrCopy[j - gap];
        j -= gap;
        setArr([...arrCopy]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current));
      }
      arrCopy[j] = temp;
      setArr([...arrCopy]);
    }
    gap = Math.floor(gap / 2);
  }

  setSortedIndices((prev) => [...prev, ...Array.from({ length: n }, (_, i) => i)]);
  setComparing([-1, -1]);
};
