<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios" collapse="condense">
      <ion-toolbar> </ion-toolbar>
      <ion-toolbar>
        <wrappable-title>Your Cards</wrappable-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <add-a-card v-if="/*!Cards.length*/ true"></add-a-card>

      <div v-if="DEBUG">
        <!-- For debugging the reactive cards array -->
        <button @click="update()">Update</button>
        <pre>{{ JSON.stringify(cards.allCards.value, null, 2) }}</pre>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/vue";
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import AddACard from "@/components/home/AddACard.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";
import { DoseNumbers } from "@/utils/cards/card";
import CardHandler from "@/utils/cards";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export default defineComponent({
  name: "Home",
  props: {
    id: {
      type: Number
    }    
  },
  setup() {    
    const cards: CardHandler = inject("CardHandler") as CardHandler;
    const router = useRouter();    

    

    // For debugging the reactive Cards array
    // console.log(Cards.value);
    const DEBUG = true;
    const update = () => {
      cards.addCard({
        id: 3,
        lastName: "Smith",
        firstName: "John",
        middleInitial: "K",
        name: "",
        dob: "2021-07-31T17:01:25.051Z",
        dobFormatted: "",
        fullyVaccinated: false,
        patientNumber: "2837529873894",
        doses: [
          {
            doseNumber: '1' as DoseNumbers,
            brand: "Pfizer",
            date: "",
            dateFormatted: "5/12/21",
            administeredByOrAt: "CVS9999",
            lot: "KS2384",
          },
        ],
      });
    };
    return { router, update, cards, DEBUG };
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    AddACard,
    WrappableTitle,
  },
});
</script>

<style scoped>
/* ion-toolbar {
  margin-top: 50px;
} */

ion-title {
  font-weight: 800;
}
</style>