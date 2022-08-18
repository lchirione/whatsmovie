export const numRandom = (min, max) => {
  const num = Math.floor(Math.random() * (min - max) + min);

  return num;
};
