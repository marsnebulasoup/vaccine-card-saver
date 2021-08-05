import { Card } from './card';
import { watch, ref, Ref } from 'vue';
import { Storage } from '@capacitor/storage';

const DEBUG = false;

export default function Cards(): Ref<Card[]> {

  const cards = ref<Card[]>([]);

  Storage.get({ key: 'cards' })
    .then(resp => {
      if (typeof resp == "object")
        if (typeof resp.value == "string") {
          const parsedCards = JSON.parse(resp.value)
          if (parsedCards.length) {
            if (DEBUG) console.log('Setting cards to parsedCards')
            cards.value = parsedCards
          }
        }
        else console.log('Saved cards not found')
      else console.log('Saved cards not object')
    })
    .finally(() => {
      watch(() => cards, (curr: Ref<Card[]>): void => {
        if (DEBUG) {
          console.log('Cards changed, saving them ')
          console.log(curr.value)
        }
        Storage.set({
          key: 'cards',
          value: JSON.stringify(cards.value)
        })
      }, { deep: true })
    });

  return cards;
}

