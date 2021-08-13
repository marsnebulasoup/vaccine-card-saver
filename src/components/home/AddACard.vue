<template>
  <ion-card mode="ios">
    <ion-card-header>
      <ion-card-title
        >Looks like you don't have any cards saved.</ion-card-title
      >
    </ion-card-header>
    <ion-card-content>
      <icon-button @click="$emit('addCard')" :iconRight="arrowForward"
        >Add one now</icon-button
      >
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue";
import { arrowForward } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import IconButton from "../other/buttons/IconButton.vue";

export default defineComponent({
  name: "AddACard",
  emits: ['addCard'],
  setup() {
    return {
      router: useRouter(),
      arrowForward,
    };
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IconButton,
  },
});
</script>

<style scoped>
ion-card-title {
  font-size: 22px;
  font-weight: 600;
}
</style>