import { Card } from './../cards/card';
import { findCardEl } from './ViewerModeHandler';
const domtoimage = require("dom-to-image");

const DEBUG = false;

export default function CardToImg(id: Card["id"]): Promise<string> {
  return new Promise((resolve, reject) => {
    const cardEl = findCardEl(id) as HTMLElement;
    const initialWidth = cardEl.style.width;
    const initialMargin = cardEl.style.margin;
    cardEl.style.width = "375px";
    cardEl.style.margin = "0";

    DEBUG && console.log("cardEl, ", cardEl);
    domtoimage
      .toPng(cardEl)
      .then((image: string) => { // image: data:image/png;base64,.........
        // const img = new Image();
        // img.src = dataUrl;
        // document.getElementById("homepage")?.appendChild(img);
        cardEl.style.width = initialWidth;
        cardEl.style.margin = initialMargin;
        DEBUG && console.log(image)
        resolve(image)
      })
      .catch((error: string) => {
        console.error("Unable to convert card to image", error);
        reject(error)
      });
  })
}