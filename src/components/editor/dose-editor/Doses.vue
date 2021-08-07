<template>
  <section>
    <transition-group @enter="enter" @leave="leave" :css="false">
      <dose-editor
        v-for="(dose, index) in doses"
        :key="dose"
        @removeEditor="removeADose(index)"
        :class="{ 'this-is-the-last-dose-editor': index === doses.length - 1 }"
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

export default defineComponent({
  name: "Doses",
  setup() {
    const MAX_DOSES = 4;
    const doses = ref<any>([]); // TODO: 👈 change type here
    const count = ref(0);
    const addADose = () => {
      doses.value.push(count.value);
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
    return {
      MAX_DOSES,
      doses,
      addDoseCard,
      addADose,
      removeADose,
      isValidatorErrorVisible,
      validatorErrorMsg,
      validatorErrorEl,
    };
  },
  methods: {
    ...ListAnimations,
  },
  components: {
    AddADose,
    DoseEditor,
    ValidationPopoverWrapper,
  },
});
</script>

<style scoped>
</style>
