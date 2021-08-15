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
import {
  defineComponent,
  inject,
  onMounted,
  provide,
  Ref,
  ref,
  watch,
} from "vue";
import AddADose from "./AddADose.vue";
import DoseEditor from "./DoseEditor.vue";
import ListAnimations from "@/utils/animations/list";
import scrollIntoView from "scroll-into-view";
import { Errors, ErrorHandlers } from "@/utils/other/ErrorHandlers";
import ValidationPopoverWrapper from "@/components/other/popover/ValidationPopoverWrapper.vue";
import { Card, Dose, VaccineDose } from "@/utils/cards/card";
import ErrorDetails from "@/components/other/text/ErrorDetails.vue";
import {
  CreateNewDoseNumberArrayForChipSelector,
  FormatDosesForEditing,
  ManageDisabledDoseNumbers,
} from "@/utils/other/DoseNumbersHandler";
import { notify, nudge } from "@/utils/haptics";
import { handleDelete } from "@/utils/other/AlertHandler";
import { NotificationType } from "@capacitor/haptics";

export default defineComponent({
  name: "Doses",
  setup() {
    const MAX_DOSES = 4;
    // TODO: actually type out this 👇 type so it can be imported in DoseNumberHandler.ts also
    const doses = ref<{ id: number; dose: VaccineDose }[]>([]);
    const content: Ref<Card> = inject("content") as Ref<Card>;

    const doseNumbers = CreateNewDoseNumberArrayForChipSelector();
    provide("DoseNumbers", doseNumbers);

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

    const count = ref(0);
    const addADose = (dose?: Dose) => {
      doses.value.push({
        id: count.value,
        dose: new VaccineDose({
          doseNumber: dose?.doseNumber || "",
          brand: dose?.brand || "",
          date: dose?.date || "",
          lot: dose?.lot || "",
          administeredByOrAt: dose?.administeredByOrAt || "",
        }),
      });
      count.value++;

      // animate scroll but not if adding pre-filled doses, because that's done on the page load
      dose ||
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

    // Reset doses when view is re-navigated to and load doses if in editing mode
    onMounted(() => {
      doses.value = [];
      count.value = 0;
      const stop = watch(
        () => content.value.doses,
        () => {
          doses.value = FormatDosesForEditing(content.value.doses);
          stop();
        },
        { deep: true }
      );
      content.value.doses.forEach((dose) => console.log(dose));
    });

    const removeADose = (index: number) => {
      handleDelete({ header: "Delete this dose?" }, () => {
        notify({ type: NotificationType.Success });
        doses.value.splice(index, 1);
      });
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
