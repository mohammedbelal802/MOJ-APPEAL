import React, { useEffect, useState } from "react";
import { FingerprintSdk } from "../../fingerprint_reader/api/sdk_mod";
// import "./app.css";

const FingerPrintCapture: React.FC = () => {
  const [fingerprint, setFingerprint] = useState<any | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");

  useEffect(() => {
    const fingerprintInstance = new FingerprintSdk();
    setFingerprint(fingerprintInstance);

    fingerprintInstance
      .getDeviceList()
      .then((devices: any) => setDeviceId(devices[0]))
      .catch((error: any) => console.log(error));

    return () => {
      fingerprintInstance.stopCapture();
    };
  }, []);

  const clearImage = () => {
    let vDiv = document.getElementById("imagediv");
    if (vDiv) {
      vDiv.innerHTML = "";
      localStorage.setItem("imageSrc", "");
    }
  };

  const startCapturing = () => {
    if (fingerprint) {
      fingerprint.startCapture();
    }
  };

  const stopCapturing = () => {
    if (fingerprint) {
      fingerprint.stopCapture();
    }
  };

  const getInfo = () => {
    if (fingerprint) {
      fingerprint
        .getDeviceList()
        .then((devices: any) => setDeviceId(devices[0]))
        .catch((error: any) => console.log(error));

      console.log(fingerprint);
    }
  };

  const onImageDownload = () => {
    if (
      localStorage.getItem("imageSrc") === "" ||
      localStorage.getItem("imageSrc") === null ||
      document.getElementById("imagediv")?.innerHTML === ""
    ) {
      alert("No image to download");
    } else {
      stopCapturing();
      downloadURI(localStorage.getItem("imageSrc")!, "huella.png", "image/png");
    }
  };

  return (
    <div className="">
      <h1>Fingerprint reader</h1>
      <h2>
        {deviceId
          ? `Conectado a ${deviceId}`
          : "No hay lectores de huella conectados"}
      </h2>
      <button id="clear" onClick={clearImage}>
        Borrar Huella
      </button>
      <button id="start" onClick={startCapturing}>
        Comenzar Captura
      </button>
      <button id="stop" onClick={stopCapturing}>
        Detener Captura
      </button>
      <button id="getInfo" onClick={getInfo}>
        Obtener dispositivos
      </button>
      <input
        type="button"
        className="btn btn-primary"
        id="saveImagePng"
        value="Export"
        onClick={onImageDownload}
      />
      <div id="imagediv"></div>
    </div>
  );
};

export default FingerPrintCapture;

function downloadURI(uri: string, name: string, dataURIType: string) {
  if (IeVersionInfo() > 0) {
    const blob = dataURItoBlob(uri, dataURIType);
    // @ts-ignore
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {
    let save = document.createElement("a");
    save.href = uri;
    save.download = name;
    let event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    save.dispatchEvent(event);
  }
}

function dataURItoBlob(dataURI: string, dataURIType: string): Blob {
  const binary = atob(dataURI.split(",")[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: dataURIType });
}

function IeVersionInfo(): number {
  const sAgent = window.navigator.userAgent;
  const isIE = sAgent.indexOf("MSIE") > -1 || sAgent.indexOf("Trident/") > -1;
  const isEdge = sAgent.indexOf("Edge/") > -1;

  if (isIE) {
    const ieVersion = parseInt(
      sAgent.substring(
        sAgent.indexOf("MSIE") + 5,
        sAgent.indexOf(".", sAgent.indexOf("MSIE"))
      ),
      10
    );
    return ieVersion;
  } else if (isEdge) {
    return 12; // Microsoft Edge
  }

  return 0; // Other browsers
}
