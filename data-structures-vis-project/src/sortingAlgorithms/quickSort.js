export const quickSort = async (array, setArr, setRedTube, setYellowTube, setGreenTube, setOrangeTube, delayRef) => {
  let arrCopy = [...array];

  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, delayRef.current));
  };

  const partition = async (start, end) => {
    let pivot = arrCopy[end];
    setYellowTube([end]); // Highlight pivot
    await delay();
    // alert("Pivot is " + pivot);
    let i = start - 1;

    for (let j = start; j < end; j++) {
      setRedTube([j]); // Highlight elements being scanned
      await delay();

      if (arrCopy[j] < pivot) {
        // alert("A element less than pivot is found: " + arrCopy[j]);
        i++;
        setOrangeTube([i]); // Highlight where the i-th element will be swapped
        await delay(2);
        setRedTube([i, j]); // Highlight swapped elements
        await delay(2);

        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]; // Swap elements
        setArr([...arrCopy]);
        // alert("Swapping " + arrCopy[i] + " and " + arrCopy[j]);
        await delay();
      }
    }

    // alert("Pivot is being swapped with " + arrCopy[i + 1]);
    [arrCopy[i + 1], arrCopy[end]] = [arrCopy[end], arrCopy[i + 1]]; // Swap pivot to correct position
    setRedTube([i + 1, end]); // Highlight swapped elements
    setArr([...arrCopy]);
    await delay();

    setRedTube([]);
    setYellowTube([]);
    setOrangeTube([]);
    setGreenTube((prev) => [...prev, i + 1]); // Mark pivot as sorted
    return i + 1;
  };

  const quickSortRecursive = async (start, end) => {
    if (start < end) {
      let pi = await partition(start, end);
      await quickSortRecursive(start, pi - 1); // Recursively sort left subarray
      await quickSortRecursive(pi + 1, end); // Recursively sort right subarray
    } else if (start === end) {
      setGreenTube((prev) => [...prev, start]); // Mark single element as sorted
    }
  };

  await quickSortRecursive(0, arrCopy.length - 1);
  setGreenTube([...Array(arrCopy.length).keys()]); // Mark entire array as sorted
};
