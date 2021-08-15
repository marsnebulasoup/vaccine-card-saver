import { alertController } from "@ionic/vue";
import { nudge } from "../haptics";

export const handleDelete = async ({
  header = "Delete this?",
  msg = "You won't be able to recover it afterwards.",
}: {
  header?: string;
  msg?: string;
}, onConfirm?: Function, onCancel?: Function) => {
  nudge()
  const alert = await alertController.create({
    cssClass: "delete-card-alert",
    header: header,
    message: msg,
    buttons: [
      {
        text: "Cancel",
        handler: () => {
          console.log("Canceling Delete");
          nudge();
          onCancel && onCancel()
        },
      },
      {
        text: "Delete",
        role: "delete",
        cssClass: "delete",
        handler: () => {
          onConfirm && onConfirm()
        },
      },
    ],
  });
  return alert.present();
};