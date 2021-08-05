<template>
  <ion-grid style="margin-bottom: 30px" class="ion-no-padding ion-no-margin">
    <ion-row>
      <ion-col>
        <field-input
          autocomplete="family-name"
          :required="true"
          :icon="person"
          placeholder="Sisko"
          :max="50"
          :pattern="/^[\p{L},.'-]+$/u"
          v-model="content.lastName"
          >Last Name</field-input
        >
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <field-input
          autocomplete="given-name"
          :required="true"
          :icon="person"
          placeholder="Benjamin"
          :max="50"
          :pattern="/^[\p{L},.'-]+$/u"
          v-model="content.firstName"
          >First Name</field-input
        >
      </ion-col>
      <ion-col>
        <field-input
          :icon="person"
          :max="1"
          placeholder="L"
          :pattern="/^[\p{L},.'-]+$/u"
          v-model="content.middleInitial"
        >
          Middle Initial
        </field-input>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <date-input :icon="calendar" type="date" v-model="content.dob"
          >Date of Birth</date-input
        >
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <!-- TODO: Add correct icon -->
        <field-input
          :icon="documentText"
          placeholder="5S30M1HE25S7"
          :max="20"
          :pattern="/[a-zA-Z0-9]/g"
          v-model="content.patientNumber"
          >Patient number</field-input
        >
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <checkbox :icon="person" color="success" placeholder="Are you fully vaccinated?" v-model="content.fullyVaccinated">Fully Vaccinated</checkbox>
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
export default defineComponent({
  name: "PersonalInfoForm",
  setup() {
    const content: Ref = inject("content") as Ref;
    return { person, content, calendar, documentText };
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

