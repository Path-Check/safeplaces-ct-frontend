const getListHeight = (array, itemSize, maxSize) => {
  const size = array.length * itemSize;
  return size > maxSize ? maxSize : size;
};

export default getListHeight;
