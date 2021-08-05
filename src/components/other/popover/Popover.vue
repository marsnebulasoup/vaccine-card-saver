<template>
  <ion-content class="ion-padding">
    <div style="display: flex; align-items: center">
      <ion-title class="ion-no-padding popover-title">Last Name</ion-title>
      <ion-icon @click="$emit('dismiss')" :icon="closeIcon"></ion-icon>
    </div>
    <p>
      The <strong>Last Name</strong> field is found on the top-left of your
      vaccine card.
    </p>
    <img
      class="ion-margin-top popover-image"
      :src="require('@/assets/sample-card.jpg')"
    />
  </ion-content>
</template>

<script>
import { IonTitle, IonContent, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import { close as closeIcon } from "ionicons/icons";

export default defineComponent({
  name: "Popover",
  emits: ['dismiss'],
  setup() {
    return { closeIcon };
  },
  components: {
    IonContent,
    IonTitle,
    IonIcon,
  },
});
</script>

<style>
.popover-styles .popover-content {
  top: 0px !important;
  left: 0px !important;
  margin: 150px 30px !important;
  width: unset !important;
  max-height: 500px;
}

.popover-styles .popover-title {
  font-weight: 700;
  text-transform: uppercase;
}

.popover-styles .popover-image {
}

.popover-styles ion-icon {
  padding: 0 !important;
  color: var(--ion-color-medium)
}
</style>