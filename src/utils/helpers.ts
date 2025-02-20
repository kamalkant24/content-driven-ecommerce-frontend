export const logout = () => {
  localStorage.removeItem("access_token");
};

export const getFullProductUrl = (str: string) =>
  `http://localhost:8080/image/${str}`;

export const discountedProductPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const shortText = (str: string) => {
  const shortStrArray = str.split(" ").slice(0, 15);
  shortStrArray.push("...");
  const resultStr = shortStrArray.join(" ");
  return resultStr;
};
