<template>
  <ion-card mode="ios">
    <ion-card-content>
      <ion-card-title>New Dose</ion-card-title>
      <chip-selector
        :items="['First', 'Second', 'Other']"
        :icon="doseNumberIcon"
        type="single"
        color="primary"
        @selectionChanged="log($event.value)"
        >Dose</chip-selector
      >
      <chip-selector
        :items="['Pfizer', 'Moderna', 'J&J']"
        :icon="vaccineBrandIcon"
        type="single"
        color="success"
        @selectionChanged="log($event.value)"
        >Brand</chip-selector
      >
      <field-input
        :icon="lotNumberIcon"
        color="medium"
        placeholder="NX74205"
        :max="10"
        :pattern="/[a-zA-Z0-9]/g"
        :noPadding="true"
        >LOT Number</field-input
      >
      <date-input
        v-model="tester"
        :icon="dateIcon"
        type="date"
        color="medium"
        :noPadding="true"
        >Date</date-input
      >
      <field-input
        :icon="dateIcon"
        color="medium"
        placeholder="Julian Bashir, MD"
        :pattern="/^[\p{L}0-9 !@#$%^&*()_?:;,.'-]+$/u"
        :noPadding="true"
        :wrapCaption="true"
        >Healthcare professional or clinic site</field-input
      >
      <div
        class="ion-margin-top ion-padding-top"
        style="display: flex; justify-content: flex-end"
      >
        <icon-button
          @click="$emit('removeEditor')"
          color="danger"
          :iconLeft="deleteIcon"
          mode="md"
          >Remove</icon-button
        >
        <!-- 😁 -->
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/vue";
import { addOutline } from "ionicons/icons";
import ChipSelector from "@/components/other/chips/ChipSelector.vue";
import FieldInput from "../../other/inputs/FieldInput.vue";
import {
  flaskOutline as doseNumberIcon,
  extensionPuzzleOutline as vaccineBrandIcon,
  calendarOutline as dateIcon,
  gridOutline as lotNumberIcon,
  locationOutline as clinicSiteIcon,
  closeOutline as deleteIcon,
} from "ionicons/icons";
import IconButton from "@/components/other/buttons/IconButton.vue";
import DateInput from "@/components/other/inputs/DateInput.vue";

export default defineComponent({
  name: "Dose",
  emits: ["removeEditor"],
  setup() {
    const tester = ref();
    return {
      addOutline,
      doseNumberIcon,
      vaccineBrandIcon,
      dateIcon,
      lotNumberIcon,
      clinicSiteIcon,
      deleteIcon,
      tester,
      log: console.log,
    };
  },
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    ChipSelector,
    FieldInput,
    IconButton,
    DateInput,
  },
});
</script>,
    ItemSelector

<style scoped>
ion-card-title {
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
}

ion-item {
  --padding-end: 0;
  --padding-start: 0;
  --inner-padding-start: 0;
  --inner-padding-end: 0;
}
</style>