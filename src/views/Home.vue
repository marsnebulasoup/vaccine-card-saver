<template>
  <ion-page>
    <ion-header
      :class="{ invisible: isInViewerMode }"
      class="ion-no-border"
      mode="ios"
      collapse="condense"
    >
      <ion-toolbar></ion-toolbar>
      <ion-toolbar>
        <wrappable-title>Your Cards</wrappable-title>
      </ion-toolbar>
    </ion-header>
    <ion-content ref="page" :fullscreen="true">
      <add-a-card
        v-if="!cards.allCards.value.length"
        @addCard="openEditor()"
      ></add-a-card>
      <transition-group @enter="enter" @leave="leave" :css="false">
        <vaccine-card
          v-for="card in cards.allCards.value"
          :card="card"
          :key="card.id"
          @click="openOrCloseViewerMode(card, $event)"
          :class="{
            'hide-card': shouldHideCard(card),
            'hide-card-completely': shouldHideCardCompletely(card),
          }"
        ></vaccine-card>
      </transition-group>
      <viewer-mode-tools
        v-if="cards.allCards.value.length"
        :isInViewerMode="isInViewerMode"
        :card="cardInViewerMode"
      ></viewer-mode-tools>

      <!-- For debugging the reactive cards array -->
      <div
        :class="{ invisible: isInViewerMode }"
        v-if="DEBUG"
        style="margin: 10px"
      >
        <button @click="update()">Update</button>
        <button @click="cards.removeAllCards()">Remove All Cards</button>
        <error-details title="Cards" :data="cards.allCards.value" />
      </div>

      <fab :class="{ invisible: isInViewerMode }" @click="openEditor()" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  onIonViewDidEnter,
} from "@ionic/vue";
import { defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";
import AddACard from "@/components/home/AddACard.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";
import { DoseNumbers } from "@/utils/other/DoseNumbersHandler";
import CardHandler from "@/utils/cards";
import VaccineCard from "@/components/card/VaccineCard.vue";
import Fab from "@/components/other/Fab.vue";
import ListAnimations from "@/utils/animations/list";
import ErrorDetails from "@/components/other/text/ErrorDetails.vue";
import { ViewerModeHandler } from "@/utils/other/ViewerModeHandler";

import ViewerModeTools from "@/components/home/ViewerModeTools.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export default defineComponent({
  name: "Home",
  props: {
    id: {
      type: Number,
    },
  },
  setup() {
    const cards: CardHandler = inject("CardHandler") as CardHandler;
    const router = useRouter();

    const openEditor = () => router.push("editor");
    // For debugging the reactive Cards array
    // console.log(Cards.value);
    const DEBUG = true;
    const update = () => {
      cards.addCard({
        id: 3,
        lastName: "Klown",
        firstName: "George",
        middleInitial: "D",
        name: "",
        dob: "2021-07-31T17:01:25.051Z",
        dobFormatted: "",
        fullyVaccinated: false,
        patientNumber: "2837529873894",
        doses: [
          {
            doseNumber: "1" as DoseNumbers,
            brand: "Pfizer",
            date: "",
            dateFormatted: "5/12/21",
            administeredByOrAt: "CVS9999",
            lot: "KS2384",
          },
          {
            doseNumber: "2" as DoseNumbers,
            brand: "Pfizer",
            date: "",
            dateFormatted: "6/2/21",
            administeredByOrAt: "CVS9999",
            lot: "KS2384",
          },
        ],
      });
    };

    const page = ref();

    onIonViewDidEnter(() => page.value.$el.scrollToTop(500));
    return {
      router,
      page,
      openEditor,
      update,
      cards,
      DEBUG,
      ...ViewerModeHandler(page),
    };
  },
  methods: {
    ...ListAnimations,
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    AddACard,
    WrappableTitle,
    VaccineCard,
    Fab,
    ErrorDetails,
    ViewerModeTools,
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

.invisible {
  visibility: hidden !important;
}

.hide-card {
  visibility: hidden;
}

.hide-card-completely {
  display: none;
}
</style>