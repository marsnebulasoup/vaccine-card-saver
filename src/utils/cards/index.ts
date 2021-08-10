import { Ref } from 'vue';
import { Card, FormatVaccineCard } from './card';
import Cards from './cards';


const DEBUG = false;

class CardHandler {
  cards: Ref<Card[]>;
  constructor() {
    this.cards = Cards()
  }

  get allCards() {
    return this.cards as Readonly<Ref<Card[]>>;
  }

  getCard(id: number): Card | undefined {
    return this.cards.value.find(card => card.id === id);
  }

  getCardIndex(id: number): number {
    return this.cards.value.findIndex(card => card.id === id);
  }

  addCard(card: Card): void {
    // 👉👉👉 look into duplicates being made here...but that's probably not an issue. also display the card on the home screen when it is added
    if (card.id) this.editCard(card) // for new cards, the id should be 0, since it'll be changed here
    card.id = this.generateId()
    this.cards.value.unshift(
      FormatVaccineCard(card)
    );
  }

  editCard(card: Card): boolean {
    const index = this.getCardIndex(card.id);
    if (~index) {
      this.cards.value[index] = FormatVaccineCard(card)
      return true
    }
    return false
  }

  removeCard(id: number): void {
    this.cards.value = this.cards.value.filter(card => card.id !== id)
  }

  removeAllCards() {
    this.cards.value = []
  }

  generateId(): number {
    const ids = this.cards.value.map(card => card.id);
    let id = 0;
    while (ids.includes(id)) {
      id = Math.floor(Math.random() * 10000000000);
      DEBUG && console.error(`⚠ WARNING ⚠\n The ID '${id}' is used for multiple Cards, so it'll be changed to '${id}'`)
    }
    return id
  }
}

export default CardHandler;