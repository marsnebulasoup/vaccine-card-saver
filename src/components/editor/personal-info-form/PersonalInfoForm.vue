<template>
  <ion-grid style="margin-bottom: 30px" class="ion-no-padding ion-no-margin">
    <!-- TODO: Add help button -->
    <ion-row>
      <ion-col>
        <field-input
          name="Last Name"
          errorMsg="That doesn't look like a last name"
          autocomplete="family-name"
          :required="true"
          :icon="person"
          placeholder="Sisko"
          :max="50"
          :pattern="/^[\p{L},.'-]+$/u"
          :banSpaces="true"
          :popover="popoverHelp.lastName"
          v-model="content.lastName"
          >Last Name</field-input
        >
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <field-input
          name="First Name"
          errorMsg="That doesn't look like a first name"
          autocomplete="given-name"
          :required="true"
          :icon="person"
          placeholder="Benjamin"
          :max="50"
          :banSpaces="true"
          :pattern="/^[\p{L},.'-]+$/u"
          :popover="popoverHelp.firstName"
          v-model="content.firstName"
          >First Name</field-input
        >
      </ion-col>
      <ion-col>
        <field-input
          name="Middle Initial"
          errorMsg="That doesn't look like a middle initial"
          :icon="person"
          :max="1"
          placeholder="L"
          :banSpaces="true"
          :pattern="/^[\p{L},.'-]+$/u"
          :popover="popoverHelp.middleInitial"
          v-model="content.middleInitial"
        >
          Middle Initial
        </field-input>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <date-input
          name="Date of Birth"
          :required="true"
          :icon="calendar"
          type="date"
          v-model="content.dob"
          :popover="popoverHelp.dob"
          >Date of Birth</date-input
        >
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <!-- TODO: Add correct icon -->
        <field-input
          name="Patient Number"
          errorMsg="That doesn't look like a valid patient number"
          :icon="patientNumberIcon"
          placeholder="5S30M1HE25S7"
          :max="20"
          :pattern="/[a-zA-Z0-9]/g"
          :banSpaces="true"
          v-model="content.patientNumber"
          :popover="popoverHelp.patientNumber"
          >Patient number</field-input
        >
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <checkbox
          name="Fully Vaccinated"
          :icon="fullyVaccinatedIcon"
          color="success"
          placeholder="Are you fully vaccinated?"
          v-model="content.fullyVaccinated"
          :popover="popoverHelp.fullyVaccinated"
          >Fully Vaccinated</checkbox
        >
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, Ref, inject } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { person, calendar, documentText } from "ionicons/icons";
import FieldInput from "@/components/other/inputs/FieldInput.vue";
import DateInput from "@/components/other/inputs/DateInput.vue";
import Checkbox from "@/components/other/inputs/Checkbox.vue";
import { Card } from "@/utils/cards/card";
export default defineComponent({
  name: "PersonalInfoForm",
  setup() {
    const content: Ref<Card> = inject("content") as Ref<Card>;
    const popoverHelp = require("@/assets/PopoverHelp.json");
    const patientNumberIcon = require("@/assets/icons/patientNumber.svg");
    const fullyVaccinatedIcon = require("@/assets/icons/fullyVaccinated.svg");

    return {
      popoverHelp,
      person,
      content,
      calendar,
      patientNumberIcon,
      fullyVaccinatedIcon,
    };
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    FieldInput,
    DateInput,
    Checkbox,
  },
});
</script>

