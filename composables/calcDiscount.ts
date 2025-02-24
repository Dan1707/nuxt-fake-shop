export const calcDiscount = (price: number, discount: number) => {
  return price - price * (discount / 100);
};
