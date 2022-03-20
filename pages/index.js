import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Script from "next/script";
import { AiOutlineDownload } from "react-icons/ai";

export default function Home() {
  useEffect(() => {
    require("../public/utils/qrcode");
  }, []);

  const [url, setUrl] = useState("");
  const [qrcode, setQRCode] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let qr = null;

    if (qrcode) {
      if (url) {
        qrcode.clear();
        qrcode.makeCode(url);
        qr = qrcode;
      } else {
        document.getElementById("qr-preview").innerHTML = "";
        alert("You need to enter a url or link");
      }
    } else {
      qr = new QRCode("qr-preview", {
        text: url,
      });
    }
    setQRCode(qr);
  };

  useEffect(() => {
    console.log(qrcode);
  }, [qrcode]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="/utils/qrcode.js" />
      <Script src="/utils/isURL.js" />
      <Script src="/utils/downloadQR.js" />
      <h2 className={styles.title}>
        ITU DSK - QR Code generator{" "}
        <img
          style={{ width: 20, marginLeft: 10 }}
          src="/logo.png"
          alt="dsk-logo"
        />
      </h2>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <label>Site URL or Link</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
        />
        <button type="submit">Generate</button>
      </form>
      <div
        style={{ display: qrcode ? "unset" : "none" }}
        id="qr-preview"
        className={styles.qr_preview}
      ></div>
      {qrcode && (
        <>
          <button
            className={styles.download}
            onClick={() => {
              downloadQR(
                document
                  .getElementById("qr-preview")
                  .getElementsByTagName("img")[0].src
              );
            }}
          >
            Download <AiOutlineDownload />
          </button>
        </>
      )}
      <footer className={styles.footer}>
        ITU DSK <span className={styles.pipe}></span>{" "}
        <span style={{ opacity: 0.8, textTransform: "uppercase" }}>
          Yazılım
        </span>
      </footer>
    </div>
  );
}
