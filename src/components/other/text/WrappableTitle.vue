<template>
  <div
    :style="`font-size: ${size}px; padding: 0px ${
      !noPadding ? '16px 6px' : ''
    };`"
    class="wrappable-title"
  >
    <ion-text :color="color">
      <slot></slot>
    </ion-text>
  </div>
</template>

<script>
import { IonText } from "@ionic/vue";

export default {
  name: "WrappableTitle",
  props: {
    color: {
      type: String,
      default: "dark",
    },
    size: {
      type: [Number, String],
      default: 34,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonText,
  },
};
</script>

<style scoped>
.wrappable-title {
  word-break: break-word;
  min-width: 100%;
  font-weight: 700;
  text-align: start;
  line-height: 100%;
}
</style>