import CardHandler from "../cards";
import { Card } from "../cards/card";
import CardToImg from "./CardToImg";


export default function ShareHandler(card: Card) {
  console.log('Sharing card ', card.id)
  CardToImg(card);
}


