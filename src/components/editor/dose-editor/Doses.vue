<template>
  <section>
    <error-details v-if="DEBUG" title="Doses" :data="doses" />
    <error-details v-if="DEBUG" title="Dose Numbers" :data="doseNumbers" />
    <transition-group @enter="enter" @leave="leave" :css="false">
      <dose-editor
        v-for="(dose, index) in doses"
        :key="dose.id"
        :dose="dose.dose"
        @doseModified="doses[index].dose = $event"
        @removeEditor="removeADose(index)"
        :class="{
          'this-is-the-last-dose-editor': index === doses.length - 1,
        }"
      ></dose-editor>
    </transition-group>
    <transition @enter="enter" @leave="leave" :css="false" mode="out-in">
      <add-a-dose
        v-if="doses.length < MAX_DOSES"
        @click="addADose()"
        ref="addDoseCard"
      ></add-a-dose>
    </transition>
  </section>
  <validation-popover-wrapper
    v-model:isPopoverOpen="isValidatorErrorVisible"
    v-model:popoverEvent="validatorErrorEl"
    :message="validatorErrorMsg"
  ></validation-popover-wrapper>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, watch } from "vue";
import AddADose from "./AddADose.vue";
import DoseEditor from "./DoseEditor.vue";
import ListAnimations from "@/utils/animations/list";
import scrollIntoView from "scroll-into-view";
import { Errors, ErrorHandlers } from "@/utils/other/ErrorHandlers";
import ValidationPopoverWrapper from "@/components/other/popover/ValidationPopoverWrapper.vue";
import { Card, VaccineDose } from "@/utils/cards/card";
import ErrorDetails from "@/components/other/text/ErrorDetails.vue";
import {
  CreateNewDoseNumberArrayForChipSelector,
  ManageDisabledDoseNumbers,
} from "@/utils/other/DoseNumbersHandler";

export default defineComponent({
  name: "Doses",
  setup() {
    const MAX_DOSES = 4;
    // TODO: actually type out this 👇 type so it can be imported in DoseNumberHandler.ts also
    const doses = ref<{ id: number; dose: VaccineDose }[]>([]); 
    const content: Ref<Card> = inject("content") as Ref<Card>;

    const doseNumbers = CreateNewDoseNumberArrayForChipSelector();
    // 👉👉👉 implement the chip selector to work with this 👆👆
    watch(
      doses,
      (doses) => {
        if (doses.length) {
          content.value.doses = doses.map((dose) => dose.dose.FormattedDose);
          ManageDisabledDoseNumbers(doses, doseNumbers);
        }
      },
      { deep: true }
    );

    // Reset doses when view is re-navigated to
    watch(
      () => content.value.doses.length,
      (dosesExist) => {
        if (!dosesExist) doses.value = [];
      },
      { deep: true }
    );

    const count = ref(0);
    const addADose = () => {
      doses.value.push({
        id: count.value,
        dose: new VaccineDose({
          doseNumber: "",
          brand: "",
          date: "",
          lot: "",
          administeredByOrAt: "",
        }),
      });
      console.log(doses.value);
      count.value++;

      // animate scroll
      setTimeout(() => {
        // let the animation start playing before starting the scroll,
        // or it won't even scroll, because the new dose editor element
        // can't be located until then.
        const card = document.querySelector(
          ".this-is-the-last-dose-editor"
        ) as HTMLElement;
        if (card) scrollIntoView(card, { time: 125 });
      }, 50);
    };

    const removeADose = (index: number) => {
      console.log(index);
      console.table(doses.value);
      doses.value.splice(index, 1);
      console.table(doses.value);
    };

    const addDoseCard = ref();
    const errors: Ref<Errors> = inject("errors") as Ref<Errors>;

    const {
      addError,
      removeError,
      isValidatorErrorVisible,
      validatorErrorMsg,
      validatorErrorEl,
    } = ErrorHandlers(errors, "Doses", addDoseCard);
    watch(
      () => doses.value.length,
      (dosesExist) => {
        if (dosesExist) removeError();
        else addError(`You must add at least one dose`);
      },
      { immediate: true }
    );

    const DEBUG = true;
    return {
      MAX_DOSES,
      doses,
      addDoseCard,
      addADose,
      removeADose,
      isValidatorErrorVisible,
      validatorErrorMsg,
      validatorErrorEl,
      DEBUG,
      doseNumbers,
      log: console.log,
    };
  },
  methods: {
    ...ListAnimations,
  },
  components: {
    AddADose,
    DoseEditor,
    ValidationPopoverWrapper,
    ErrorDetails,
  },
});
</script>

<style scoped>
</style>
