import { Card, FormatVaccineCardAsText } from "../cards/card";
import CardToImg from "./CardToImg";
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Clipboard } from '@capacitor/clipboard';
import { isPlatform, toastController } from "@ionic/vue";


const DIR = "CARD_IMGS";

function generateFilePath(id: Card["id"]) {
  const filename = `CARD_${id}.png`
  const path = `${DIR}/${filename}`

  return path
}

async function ClearCache() {
  try {
    await Filesystem.rmdir({
      path: DIR,
      directory: Directory.Cache,
      recursive: true
    })
  } catch (error) {
    console.warn(error)
  }
}


async function SaveImage(image: string, id: Card["id"]) {
  await ClearCache();

  const { uri } = await Filesystem.writeFile({
    path: generateFilePath(id),
    data: image,
    directory: Directory.Cache,
    recursive: true
  });

  return uri
}

function toast(message: string, duration = 800) {
  toastController
    .create({
      message,
      duration,
      position: 'bottom',
      mode: "ios"
    }).then(toast => toast.present())
}

export default async function ShareHandler(card: Card) {
  console.log('Sharing card ', card.id)
  const image = await CardToImg(card.id);
  const imagePath = await SaveImage(image, card.id);

  const shareImg = (text = "") => {
    Share.share({
      title: `${card.firstName}'s COVID Vaccine Card`,
      text,
      url: imagePath,
      dialogTitle: 'Share this card',
    }).catch(e => {
      console.warn(e)
      if (e.message !== "Share canceled") 
        toast("Unable to share this image.")
    })
  }
  const shareImgAndText = () => {
    shareImg(FormatVaccineCardAsText(card))
  }
  const copyImg = () => {
    if (isPlatform("android")) {
      toast("Unfortunately, copying images on Android isn't supported yet.", 1500)
      return
    }
    Clipboard.write({
      image,
      label: `${card.firstName}'s COVID Vaccine Card`
    }).then(() => toast("Copied image."))
      .catch(e => {
        console.warn(e)
        toast("Unable to copy image to clipboard.")
      })
  }
  const copyText = () => {
    Clipboard.write({
      string: FormatVaccineCardAsText(card),
      label: `${card.firstName}'s COVID Vaccine Card`
    }).then(() => toast("Copied as text."))
      .catch(e => {
        console.warn(e)
        toast("Unable to copy text to clipboard.")
      })
  }

  return {
    image,
    shareImg,
    shareImgAndText,
    copyImg,
    copyText
  }
}
