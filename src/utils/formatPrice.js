export const formatPrice = (price) => {
  return `₹${Number(price).toLocaleString('en-IN')}`;
};

export default formatPrice;
