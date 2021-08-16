import { Ref } from 'vue';
import { Card, FormatVaccineCard } from './card';
import Cards from './cards';


const DEBUG = true;

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
    if (card.id !== 0) {
      this.editCard(card)
      return
    } // for new cards, the id should be 0, since it'll be changed here
    DEBUG && console.log(`Adding card with name ${card.name}`)
    card.id = this.generateId()
    this.cards.value.unshift(
      FormatVaccineCard(card)
    );
  }

  editCard(card: Card): boolean {
    DEBUG && console.log(`Editing card with name ${card.name}, not adding it`)
    const index = this.getCardIndex(card.id);
    if (~index) {
      this.cards.value[index] = FormatVaccineCard(card)
      return true
    }
    return false
  }

  formatCardForEditing(card: Card) {
    if (card) {
      card.lastName = card.lastName.replace("N/A", "");
      card.firstName = card.firstName.replace("N/A", "");
      card.middleInitial = card.middleInitial.slice(0, 1)
      card.dob = card.dob.replace("N/A", "")
      card.patientNumber = card.patientNumber.replace("N/A", "")
    }
    return card;
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
      DEBUG && console.warn(`⚠ WARNING ⚠\n The ID '${id}' is used for multiple CARDS, so it'll be changed to '${id}'`)
    }
    return id
  }
}

export default CardHandler;