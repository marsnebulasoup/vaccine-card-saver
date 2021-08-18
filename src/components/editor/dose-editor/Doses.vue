<template>
  <section>
    <error-details v-if="DEBUG" title="Doses" :data="modelValue" />
    <error-details v-if="DEBUG" title="Dose Numbers" :data="doseNumbers" />
    <transition-group @enter="enter" @leave="leave" :css="false">
      <dose-editor
        v-for="(dose, index) in iterableDoses"
        :key="dose.id"
        :dose="dose"
        @doseModified="modifyDose(index, $event)"
        @removeEditor="removeDose(dose.id)"
        :class="{
          'this-is-the-last-dose-editor': index === iterableDoses.length - 1,
        }"
      ></dose-editor>
    </transition-group>
    <transition @enter="enter" @leave="leave" :css="false" mode="out-in">
      <add-a-dose
        v-if="iterableDoses.length < MAX_DOSES"
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
  computed,
  customRef,
  defineComponent,
  inject,
  provide,
  Ref,
  ref,
  toRef,
  watch,
  WritableComputedRef,
} from "vue";
import AddADose from "./AddADose.vue";
import DoseEditor from "./DoseEditor.vue";
import ListAnimations from "@/utils/animations/list";
import scrollIntoView from "scroll-into-view";
import { Errors, ErrorHandlers } from "@/utils/other/ErrorHandlers";
import ValidationPopoverWrapper from "@/components/other/popover/ValidationPopoverWrapper.vue";
import { Dose, VaccineDose } from "@/utils/cards/card";
import ErrorDetails from "@/components/other/text/ErrorDetails.vue";
import {
  CreateNewDoseNumberArrayForChipSelector,
  FormatDosesForEditing,
  generateDoseId,
  UpdateDisabledDoseNumbers,
} from "@/utils/other/DoseNumbersHandler";
import { notify } from "@/utils/haptics";
import { handleDelete } from "@/utils/other/AlertHandler";
import { NotificationType } from "@capacitor/haptics";

export default defineComponent({
  name: "Doses",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const MAX_DOSES = 4;

    const doses = toRef(props, "modelValue") as Readonly<Ref<Dose[]>>;

    const doseNumbers = CreateNewDoseNumberArrayForChipSelector();
    provide("DoseNumbers", doseNumbers);

    const iterableDoses: WritableComputedRef<VaccineDose[]> = computed({
      get() {
        return FormatDosesForEditing(doses.value);
      },
      set(newDoses): void {
        const formattedDoses = newDoses.map((dose) => dose.FormattedDose);
        emit("update:modelValue", formattedDoses);
        UpdateDisabledDoseNumbers(newDoses, doseNumbers);
      },
    });    

    // const count = ref(0);
    const addADose = () => {
      iterableDoses.value = [
        ...iterableDoses.value,
        new VaccineDose({
          id: generateDoseId(iterableDoses.value),//count.value,
          doseNumber: "",
          brand: "",
          date: "",
          lot: "",
          administeredByOrAt: "",
        }),
      ];
      // count.value++;

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

    const modifyDose = (index: number, newDose: VaccineDose) => {
      const copy = [...iterableDoses.value];
      copy.splice(index, 1, newDose);
      iterableDoses.value = copy;
    };

    const removeDose = (id: number) => {
      handleDelete({ header: "Delete this dose?" }, () => {
        notify({ type: NotificationType.Success });
        iterableDoses.value = iterableDoses.value.filter(
          (dose) => dose.id !== id
        );
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

    const DEBUG = false; // was true;
    return {
      MAX_DOSES,
      doses,
      iterableDoses,
      addDoseCard,
      addADose,
      modifyDose,
      removeDose,
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
