<template>
  <ion-card mode="ios" @click="nudge()">
    <ion-card-content>
      <ion-item>
        <ion-icon :icon="addOutline"></ion-icon>
        <caption-text :size="20" color="light"
          >Add A Dose</caption-text
        >
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent } from "vue";
import { IonCard, IonCardContent, IonItem, IonIcon } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import { addOutline } from "ionicons/icons";
import { nudge } from "@/utils/haptics";

export default defineComponent({
  name: "AddADose",
  setup() {    
    return { addOutline, nudge };
  },
  components: {
    IonCard,
    IonCardContent,
    IonItem,
    IonIcon,
    CaptionText,
  },
});
</script>

<style scoped>
ion-card {
  margin-top: 30px;
}

ion-item {
  --border-color: transparent;
  width: fit-content;
  margin: 15px auto;
}

ion-icon {
  color: var(--ion-color-light);
  font-size: 28px;
}
</style>