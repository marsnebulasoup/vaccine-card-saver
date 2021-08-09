<template>
  <ion-card mode="ios" class="dose-card">
    <ion-card-content>
      <ion-card-title>
        <span class="dose-hashtag">#</span>
        <span class="dose-number">{{ dose.doseNumber }}</span>
        <span class="vaccine-name">{{ dose.brand }}</span>
      </ion-card-title>
      <div class="personal-info">
        <div class="items">
          <div>
            <caption-text color="dark" size="12">Date</caption-text>
            <div class="small-text">{{ dose.dateFormatted }}</div>
          </div>
          <div>
            <caption-text color="dark" size="12"
              >Administered By/At</caption-text
            >
            <div class="small-text">{{ dose.administeredByOrAt }}</div>
          </div>
        </div>
        <div class="text-end items">
          <div>
            <caption-text color="dark" size="12">Lot #</caption-text>
            <div class="small-text">{{ dose.lot }}</div>
          </div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCard, IonCardTitle, IonCardContent } from "@ionic/vue";
import { defineComponent } from "vue";
import CaptionText from "../other/text/CaptionText.vue";

export default defineComponent({
  name: "Card",
  setup() {
    return {};
  },
  components: {
    IonCard,
    IonCardTitle,
    IonCardContent,
    CaptionText,
  },
  props: {
    dose: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>
ion-card-title {
  margin-bottom: 10px;
}

.dose-card {
  margin: 7px 0;
}

.dose-hashtag {
  font-weight: 200;
}

.dose-number {
  font-weight: 400;
}

.vaccine-name {
  float: right;
  letter-spacing: 0.75px;
}

/* rest of the classes used here are from the parent component */
</style>