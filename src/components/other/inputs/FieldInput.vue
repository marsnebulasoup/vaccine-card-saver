<template>
  <ion-item
    class="hide-item-click-animation"
    :class="{ 'no-item-padding': noPadding }"
    mode="ios"
    lines="none"
    ref="item"
  >
    <ion-label v-if="$slots.default" position="stacked">
      <caption-text
        style="vertical-align: middle !important"
        :color="color"
        :wrapText="wrapCaption"
      >
        <slot></slot>{{ required ? "*" : "" }}
      </caption-text>
    </ion-label>
    <div class="input-container">
      <input
        :type="type"
        :maxlength="max"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        :value="inputValue"
        @input="inputValue = $event.target.value"
        @click="scrollInput($event, 'y')"
        class="input"
      />
      <validator-icon
        v-if="icon"
        :icon="icon"
        class="icon"
        :status="status"
        @click="openPopover($event)"
      ></validator-icon>
    </div>
  </ion-item>

  <validation-popover-wrapper
    v-model:isPopoverOpen="isValidatorErrorVisible"
    v-model:popoverEvent="validatorErrorEl"
    :message="validatorErrorMsg"
  ></validation-popover-wrapper>
  <!-- TODO: Actually add data to these 👇 popovers -->
  <popover-wrapper
    v-model:isPopoverOpen="isPopoverOpen"
    v-model:popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script lang="ts">
import { IonItem, IonLabel } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import ValidationPopoverWrapper from "@/components/other/popover/ValidationPopoverWrapper.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import {
  defineComponent,
  inject,
  onBeforeUnmount,
  Ref,
  ref,
  toRef,
  watch,
} from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";
import { InputValidators, ScrollUtils } from "@/utils/other";
import { Errors, ErrorHandlers } from "@/utils/other/ErrorHandlers";

export default defineComponent({
  name: "FieldInput",
  setup(props, { emit }) {
    const DEBUG = false;
    const item = ref();

    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: any) => {
      console.log(ev);
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };

    const status = ref<"normal" | "pass" | "fail">("normal");
    const { validateInput } = InputValidators(
      toRef(props, "pattern"),
      status,
      emit
    );

    const inputValue = ref();
    watch(
      () => props.modelValue,
      (curr) => {
        DEBUG && console.log(`Setting inputValue in ${props.name} to "${curr}"`);
        inputValue.value = curr || "";
      },
      { immediate: true }
    );
    watch(
      inputValue,
      (curr) => {
        DEBUG && console.log(`Validating inputValue "${curr}" in ${props.name} `);
        validateInput(curr);
      },
      { immediate: true }
    );

    const errors: Ref<Errors> = inject("errors") as Ref<Errors>;

    const {
      addError,
      removeError,
      deleteError,
      isValidatorErrorVisible,
      validatorErrorMsg,
      validatorErrorEl,
    } = ErrorHandlers(errors, props.name, item);
    watch(
      status,
      (curr) => {
        DEBUG && console.log(`Status changed in ${props.name} to "${curr}"`);
        if (curr === "normal" && props.required)
          addError(`${props.name} is required.`);
        else if (curr === "fail")
          addError(props.errorMsg || `Invalid input for ${props.name}`);
        else removeError();
      },
      { immediate: true }
    );

    onBeforeUnmount(() => deleteError());

    const { scrollInput } = ScrollUtils();

    return {
      item,
      isPopoverOpen,
      popoverEvent,
      openPopover,
      status,
      validateInput,
      inputValue,
      scrollInput,
      isValidatorErrorVisible,
      validatorErrorMsg,
      validatorErrorEl,
      log: console.log,
    };
  },
  props: {
    modelValue: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
    },
    pattern: {
      type: RegExp,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    placeholder: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "medium",
    },
    max: {
      type: Number,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    wrapCaption: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonItem,
    IonLabel,
    CaptionText,
    ValidationPopoverWrapper,
    ValidatorIcon,
    PopoverWrapper,
  },
});
</script>
