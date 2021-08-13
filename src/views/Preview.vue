<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios" collapse="condense">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :mode="platform"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <wrappable-title>Does this look right?</wrappable-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <vaccine-card :card="card"></vaccine-card>
    </ion-content>
    <div style="display: flex; flex-flow: nowrap">
      <full-width-button
        @click="router.back()"
        color="primary"
        :iconLeft="backIcon"
        >Back</full-width-button
      >
      <full-width-button
        @click="saveCardAndLeave()"
        color="success"
        :iconRight="doneIcon"
        >Save</full-width-button
      >
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import { computed, defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import {
  arrowBack as backIcon,
  arrowForward as doneIcon,
} from "ionicons/icons";
import FullWidthButton from "@/components/other/buttons/FullWidthButton.vue";
import VaccineCard from "@/components/card/VaccineCard.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";
import { Card, FormatVaccineCard } from "@/utils/cards/card";
import CardHandler from "@/utils/cards";

export default defineComponent({
  name: "Home",
  inject: ["platform"],
  setup(props) {
    const DEBUG = true;
    const router = useRouter();
    const cards: CardHandler = inject("CardHandler") as CardHandler;
    const card = computed(() => {
      const parsed = JSON.parse(props.unformattedCard) as Card;
      return FormatVaccineCard(parsed);
    });


    DEBUG && console.log("Card from /editor -> ", card.value);

    const saveCardAndLeave = () => {
      DEBUG && console.log('Saving card...')
      if(props.mode === "edit") cards.editCard(card.value);
      else cards.addCard(card.value);
      router.push("home");
    };

    return {
      router,
      card,
      saveCardAndLeave,
      backIcon,
      doneIcon,
    };
  },
  props: {
    unformattedCard: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true
    }
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonBackButton,
    IonButtons,
    FullWidthButton,
    VaccineCard,
    WrappableTitle,
  },
});
</script>

<style scoped>
ion-title {
  font-weight: 800;
}
</style>