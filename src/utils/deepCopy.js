const deepCopy = (items) => {
  return items.map((item) => (Array.isArray(item) ? deepCopy(item) : item));
};

module.exports = deepCopy;
