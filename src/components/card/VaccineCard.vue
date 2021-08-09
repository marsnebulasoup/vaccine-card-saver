<template>
  <ion-card mode="ios">
    <ion-card-content>
      <div class="vaccine-card">
        <div class="personal-info">
          <div class="items">
            <div>
              <caption-text size="12">{{
                card.fullyVaccinated
                  ? "Fully Vaccinated"
                  : "Not Fully Vaccinated"
              }}</caption-text>
              <wrappable-title
                style="font-size: 33px; padding: 0; color: black"
                >{{ card.name }}</wrappable-title
              >
            </div>
          </div>
          <div class="text-end items">
            <div>
              <caption-text color="dark" size="12">DOB</caption-text>
              <div class="small-text">{{ card.dobFormatted }}</div>
            </div>
            <div>
              <caption-text color="dark" size="12">Patient No.</caption-text>
              <div class="small-text">{{ card.patientNumber }}</div>
            </div>
          </div>
        </div>
        <caption-text class="dose-text" size="20">Doses</caption-text>
        <dose-card
          v-for="(dose, index) in card.doses"
          :key="index"
          :dose="dose"
        ></dose-card>
        <!-- 👉👉👉 implement props in <dose-card> -->
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCard, IonCardContent } from "@ionic/vue";
import { defineComponent } from "vue";
import CaptionText from "../other/text/CaptionText.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";
import DoseCard from "./DoseCard.vue";

export default defineComponent({
  name: "VaccineCard",
  setup() {
    return {};
  },
  props: {
    card: {
      type: Object,
      required: true,
      default() {
        return {
          name: "Joel K. Foster",
          dob: "",
          dobFormatted: "Feb 3rd, 1273",
          fullyVaccinated: false,
          patientNumber: "2837529873894",
          doses: [
            {
              number: "1",
              brand: "Pfizer",
              date: "",
              dateFormatted: "5/12/21",
              administeredByOrAt: "CVS9999",
              lot: "KS2384",
            },
          ],
        };
      },
    },
  },
  components: {
    IonCard,
    IonCardContent,
    CaptionText,
    WrappableTitle,
    DoseCard,
  },
});
</script>

<style>
ion-card-title {
  font-size: 22px;
  font-weight: 600;
}

.vaccine-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vaccine-card .personal-info {
  display: flex;
  justify-content: space-between;
}

.vaccine-card .items {
  padding-left: 5px;
  padding-right: 5px;
}

.vaccine-card .items:first-of-type {
  padding-left: 0;
}

.vaccine-card .items:last-of-type {
  padding-right: 0;
}

.vaccine-card .items > div:not(:last-of-type) {
  margin-bottom: 10px;
}

.vaccine-card .dose-text {
  margin: 15px 0;
}

.vaccine-card .text-end {
  text-align: end;
}

.vaccine-card .small-text {
  font-size: 12px;
}
</style>