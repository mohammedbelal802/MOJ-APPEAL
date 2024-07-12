import { store } from "./index";
import { storeFingerPrint } from "./fingerprint/fingerPrintSlice";

export function dispatchSetImageSrc(imageSrc) {
  store.dispatch(storeFingerPrint(imageSrc));
}
