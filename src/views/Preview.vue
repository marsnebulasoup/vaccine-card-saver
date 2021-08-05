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
      <card></card>
    </ion-content>
    <div style="display: flex; flex-flow: nowrap">
      <full-width-button
        @click="router.back()"
        color="primary"
        :iconLeft="backIcon"
        >Back</full-width-button
      >
      <full-width-button
        @click="router.push('home')"
        color="success"
        :iconRight="doneIcon"
        >Done</full-width-button
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {
  arrowBack as backIcon,
  arrowForward as doneIcon,
} from "ionicons/icons";
import FullWidthButton from "@/components/other/buttons/FullWidthButton.vue";
import Card from "@/components/card/Card.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";

export default defineComponent({
  name: "Home",
  inject: ["platform"],
  setup() {
    const router = useRouter();
    return { router, backIcon, doneIcon };
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonBackButton,
    FullWidthButton,
    Card,
    WrappableTitle,
  },
});
</script>

<style scoped>
ion-title {
  font-weight: 800;
}
</style>