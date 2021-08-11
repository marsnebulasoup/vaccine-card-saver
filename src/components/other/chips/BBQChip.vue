<template>
  <!-- TODO: Add low vibrate on click -->
  <ion-chip
    class="no-left-margin bbq-chip"
    :class="{ selected: selected }"
    :disabled="disabled"
    :outline="true"
    :color="color"
  >
    <ion-icon v-if="icon" style="font-size: 18px" :icon="icon"></ion-icon>
    <ion-label>{{ label }}</ion-label>
  </ion-chip>
</template>

<script>
import { IonChip, IonIcon, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "bbq-chip",
  props: {
    icon: {
      type: String,
      required: false,
      default: undefined,
    },
    label: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary",
    },
  },
  components: {
    IonChip,
    IonIcon,
    IonLabel,
  },
});
</script>

<style scoped>
.no-left-margin:first-of-type {
  margin-left: 0;
}

/* @media screen and (max-width: 349px) {
  .bbq-chip:last-of-type {
    display: none;
  }
} */
</style>

<style>
.bbq-chips-bag {
  white-space: nowrap;
  overflow: scroll;
}
</style>

<style scoped>
.selected {
  background: rgba(var(--ion-color-base-rgb), 20%);
  border-color: transparent;
}
</style>