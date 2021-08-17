<template>
  <ion-card
    v-if="exists"
    mode="ios"
    :style="`background: rgba(var(--${color}), ${opacity})`"
  >
    <ion-card-header>
      <ion-card-subtitle
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <caption-text :color="subtitleColor">{{ subtitle }}</caption-text>
        <ion-icon
          v-if="deleteId"
          @click="exists = false"
          :icon="closeIcon"
          style="opacity: 0.5"
        ></ion-icon>
      </ion-card-subtitle>
      <ion-card-title>
        <ion-text color="dark">
          {{ title }}
        </ion-text>
      </ion-card-title>
    </ion-card-header>
    <ion-card-content v-if="$slots.default">
      <slot></slot>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonIcon,
} from "@ionic/vue";
import { closeCircle as closeIcon } from "ionicons/icons";
import { defineComponent } from "vue";
import CaptionText from "../text/CaptionText.vue";
import InfoCard from "@/utils/other/InfoCardHandler";

export default defineComponent({
  name: "InfoCard",
  setup(props) {
    const exists = InfoCard(props.deleteId);

    return {
      closeIcon,
      exists,
    };
  },
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    color: {
      type: String,
      default: "green", // can be green, yellow, red, or blue, see css styles below
    },
    opacity: {
      type: Number,
      default: 0.3,
    },
    subtitleColor: {
      type: String,
    },
    deleteId: {
      type: String,
    },
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    CaptionText,
    IonText,
    IonIcon,
  },
});
</script>

<style scoped>
ion-card {
  box-shadow: none;
  --green: 132, 252, 148;
  --red: 255, 94, 94;
  --blue: 120, 200, 253;
  --yellow: 228, 255, 110;
}

ion-card-title {
  font-weight: 400;
  font-size: 18px;
}
</style>
