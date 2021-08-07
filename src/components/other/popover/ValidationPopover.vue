<template>
  <ion-card class="ion-no-margin">
    <ion-card-content>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        "
      >
        <caption-text color="danger" size="16">There's a problem</caption-text>
        <ion-icon @click="$emit('dismiss')" :icon="closeIcon"></ion-icon>
      </div>
      <div>{{ message }}</div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import { close as closeIcon } from "ionicons/icons";
import CaptionText from "../text/CaptionText.vue";

export default defineComponent({
  name: "Popover",
  emits: ["dismiss"],
  setup() {
    return { closeIcon };
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  components: {
    IonCard,
    IonCardContent,
    IonIcon,
    CaptionText,
  },
});
</script>

