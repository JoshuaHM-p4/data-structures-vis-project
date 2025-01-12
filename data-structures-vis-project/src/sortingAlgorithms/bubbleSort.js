export const bubbleSort = async (array, setArr, setRedTube, setSwapping, setGreenTube, delayRef) => {
  let arrCopy = [...array];
  let n = arrCopy.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setRedTube([j, j + 1]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
      if (arrCopy[j] > arrCopy[j + 1]) {
        setSwapping([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, delayRef.current));
        let temp = arrCopy[j];
        arrCopy[j] = arrCopy[j + 1];
        arrCopy[j + 1] = temp;
        setArr([...arrCopy]);
        setSwapping([-1, -1]);
      }
      setRedTube([]);
      await new Promise((resolve) => setTimeout(resolve, delayRef.current));
    }
    setGreenTube((prev) => [...prev, n - i - 1]);
  }
  setGreenTube([...Array(n).keys()]);
  setRedTube([]);
};
