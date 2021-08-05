<template>
  <ion-button
    :mode="mode"
    :size="size"
    :fill="fill"
    :expand="expand"
    :color="color"
  >
    <ion-icon
      v-if="iconLeft"
      style="padding-left: 0px; padding-right: 0px"
      slot="start"
      :icon="iconLeft"
    ></ion-icon>
    <span :style="`padding-left ${!iconLeft ? 10 : 0}px`" class="button-text"
      ><slot></slot
    ></span>
    <ion-icon
      v-if="iconRight"
      style="padding-left: 0px; padding-right: 0px"
      slot="end"
      :icon="iconRight"
    ></ion-icon>
  </ion-button>
</template>

<script>
import { defineComponent } from "vue";
import { IonIcon, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "IconButton",
  props: {
    color: {
      required: false,
      type: String,
      default: "primary",
    },
    size: {
      required: false,
      type: String,
      default: "default",
    },
    fill: {
      required: false,
      type: String,
      default: "solid",
    },
    expand: {
      required: false,
      type: String,
      default: undefined,
    },
    iconLeft: {
      required: false,
      type: String,
    },
    iconRight: {
      required: false,
      type: String,
    },
    mode: {
      type: String,
      default: 'ios'
    }
  },
  components: { IonIcon, IonButton },
});
</script>

<style scoped>
.button-text {
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1.5px;
}
ion-button {
  --border-radius: 30px !important;
  --box-shadow: none;
}
</style>