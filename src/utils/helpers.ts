export const logout = () => {
  localStorage.removeItem("access_token");
  window.location.href = "/";
};

export const shortText = (str: string) => {
  const shortStrArray = str.split(" ").slice(0, 15);
  if (shortStrArray?.length > 15) {
    shortStrArray.push("...");
  }
  const resultStr = shortStrArray.join(" ");
  return resultStr;
};

export const getFileNameFromUrl = (url: string) => {
  const arr = url.split("/");
  const imageFileName = arr[arr.length - 1];
  return imageFileName;
};

export const handlePlural = (text: string, count: number) =>
  count !== 1 ? `${text}s` : text;
