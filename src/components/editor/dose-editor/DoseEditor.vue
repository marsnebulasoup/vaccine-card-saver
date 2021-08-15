<template>
  <ion-card mode="ios">
    <ion-card-content>
      <error-details v-if="DEBUG" title="Inputs" :data="inputs" />
      <error-details v-if="DEBUG" title="Dose Numbers" :data="doseNumbers" />
      <ion-card-title>New Dose</ion-card-title>
      <chip-selector
        name="Dose Number"
        :required="true"
        v-model="inputs.doseNumber"
        :items="doseNumbers"
        :icon="doseNumberIcon"
        color="primary"
        :popover="popoverHelp.dose.doseNumber"
        >Dose</chip-selector
      >
      <chip-selector
        name="Brand"
        :required="true"
        v-model="inputs.brand"
        :items="brandNames.allBrandsForChipSelector"
        :icon="vaccineBrandIcon"
        color="success"
        :popover="popoverHelp.dose.brand"
        >Brand</chip-selector
      >
      <field-input
        name="Lot Number"
        v-model="inputs.lot"
        :icon="lotNumberIcon"
        :required="true"
        color="medium"
        placeholder="NX74205"
        :max="10"
        :pattern="/[a-zA-Z0-9]/g"
        :noPadding="true"
        :popover="popoverHelp.dose.lot"
        >LOT Number</field-input
      >
      <date-input
        name="Date"
        v-model="inputs.date"
        :icon="dateIcon"
        :required="true"
        type="date"
        color="medium"
        :noPadding="true"
        :popover="popoverHelp.dose.date"
        >Date</date-input
      >
      <field-input
        name="Healthcare Professional or Clinic Site"
        v-model="inputs.administeredByOrAt"
        :icon="dateIcon"
        color="medium"
        :required="true"
        placeholder="Julian Bashir, MD"
        :pattern="/^[\p{L}0-9 !@#$%^&*()_?:;,.'-]+$/u"
        :noPadding="true"
        :wrapCaption="true"
        :popover="popoverHelp.dose.administeredByOrAt"
        >Healthcare professional or clinic site</field-input
      >
      <div
        class="ion-margin-top ion-padding-top"
        style="display: flex; justify-content: flex-end"
      >
        <icon-button
          @click="$emit('removeEditor')"
          class="ion-no-padding"
          style="--ripple-color: transparent"
          color="danger"
          fill="clear"
          mode="md"
          >Remove</icon-button
        >
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, watch } from "vue";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/vue";

import ChipSelector from "@/components/other/chips/ChipSelector.vue";
import FieldInput from "@/components/other/inputs/FieldInput.vue";
import IconButton from "@/components/other/buttons/IconButton.vue";
import DateInput from "@/components/other/inputs/DateInput.vue";
import ErrorDetails from "@/components/other/text/ErrorDetails.vue";

import { VaccineDose } from "@/utils/cards/card";
import {
  flaskOutline as doseNumberIcon,
  extensionPuzzleOutline as vaccineBrandIcon,
  calendarOutline as dateIcon,
  gridOutline as lotNumberIcon,
  locationOutline as clinicSiteIcon,
} from "ionicons/icons";

export default defineComponent({
  name: "Dose",
  emits: ["doseModified", "removeEditor"],
  setup(props, { emit }) {
    const doseNumbers = inject("DoseNumbers") as Ref;
    const brandNames = inject("VaccineBrands") as Ref;
    const popoverHelp = require("@/assets/PopoverHelp.json");

    const dose = ref(props.dose);
    const inputs = ref({
      doseNumber: dose.value.doseNumber,
      brand: dose.value.brand,
      date: dose.value.date,
      lot: dose.value.lot,
      administeredByOrAt: dose.value.administeredByOrAt,
    });
    console.log("dose.value.date, ", dose.value.date);
    watch(
      inputs,
      () => {
        dose.value = new VaccineDose(inputs.value);
        emit("doseModified", dose.value);
      },
      { deep: true }
    );

    const DEBUG = true;
    return {
      doseNumbers,
      brandNames,
      popoverHelp,

      inputs,

      // Icons
      doseNumberIcon,
      vaccineBrandIcon,
      dateIcon,
      lotNumberIcon,
      clinicSiteIcon,

      log: console.log,
      DEBUG,
    };
  },
  props: {
    dose: {
      type: VaccineDose,
      required: true,
    },
  },
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    ChipSelector,
    FieldInput,
    IconButton,
    DateInput,
    ErrorDetails,
  },
});
</script>

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