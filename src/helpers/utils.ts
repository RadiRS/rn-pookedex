export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};
export const capFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getRandomColor = () => {
  // Math.pow is slow, use constant instead.
  const color = Math.floor(Math.random() * 16777216).toString(16);
  // Avoid loops.
  return '#000000'.slice(0, -color.length) + color;
};
