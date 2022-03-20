const downloadQR = (src, url, saveAs) => {
  saveAs(src, `qr-${url}.png`);
};
