const getWeek = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1; // Add 1 to include the start day
  return Math.ceil(days / 7);
};

export default getWeek;
