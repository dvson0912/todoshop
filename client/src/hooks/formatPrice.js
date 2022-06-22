const formatPrice = (number) => {
  let result = number;
  let x = "";
  while (result > 100) {
    x += (result / 1000).toString();
    result = result / 1000;
  }
  console.log(x);
};

export default formatPrice;
