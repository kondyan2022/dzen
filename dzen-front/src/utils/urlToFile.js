export const urlToFile = (url) => {
  const arr = url.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const data = arr[1];

  const dataStr = atob(data);
  let n = dataStr.length;
  const dataArr = new Uint8Array(n);
  while (n--) {
    dataArr[n] = dataStr.charCodeAt(n);
  }
  const file = new File([dataArr], "image.jpg", { type: mime });
  return file;
};
