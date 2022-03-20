const downloadQR = (src) => {
  console.log(src);
  const link = document.createElement("a");
  link.href = src;
  link.download = "qr.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
