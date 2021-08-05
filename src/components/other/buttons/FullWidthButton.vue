<template>
  <ion-footer class="ion-no-margin ion-no-padding" mode="ios">
    <ion-toolbar class="ion-no-margin ion-no-padding">
      <!-- TODO: Add animation to toggle between colors -->
      <ion-button
        class="ion-no-margin ion-no-padding"
        mode="ios"
        :size="size"
        :fill="fill"
        expand="full"
        :color="buttonColor"
      >
        <ion-icon v-if="iconLeft" slot="start" :icon="iconLeft"></ion-icon>
        <span v-if="!error" class="button-text"><slot></slot></span>
        <span v-else>{{ error }}</span>
        <ion-icon
          style="padding-right: 10px"
          v-if="iconRight"
          slot="end"
          :icon="iconRight"
        ></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import { IonIcon, IonButton, IonFooter, IonToolbar } from "@ionic/vue";

export default defineComponent({
  name: "IconButton",
  setup(props) {
    const buttonColor = ref(props.color);
    watch(
      () => props.color,
      (color) => (buttonColor.value = color)
    );
    watch(
      () => props.error,
      (error) => {
        if (error) {
          buttonColor.value = "danger";
          return;
        }
        buttonColor.value = props.color;
      }
      // { deep: true }
    );
    return { buttonColor };
  },
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
    iconLeft: {
      required: false,
      type: String,
    },
    iconRight: {
      required: false,
      type: String,
    },
    error: {
      required: false,
      type: String,
      default: undefined,
    },
  },
  components: { IonIcon, IonButton, IonToolbar, IonFooter },
});
</script>

<style scoped>
.button-text {
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

ion-button {
  height: 55px;
}
</style>