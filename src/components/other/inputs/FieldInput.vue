<template>
  <ion-item
    class="hide-item-click-animation"
    :class="{ 'no-item-padding': noPadding }"
    mode="ios"
    lines="none"
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

  <popover-wrapper
    v-model:isPopoverOpen="isPopoverOpen"
    v-model:popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script lang="ts">
import { IonItem, IonLabel } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import { defineComponent, inject, Ref, ref, toRef, watch } from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";
import {
  Errors,
  ErrorHandlers,
  InputValidators,
  ScrollUtils,
} from "@/utils/other";

export default defineComponent({
  name: "FieldInput",
  setup(props, { emit }) {
    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: Event) => {
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

    const inputValue = ref(props.modelValue || "");
    watch(inputValue, (curr) => {
      validateInput(curr);
    });

    const errors = ErrorHandlers(inject("errors") as Ref<Errors>, props.name); // TODO: fix case where props.name is undefined
    watch(
      status,
      (curr) => {
        console.log(curr);
        if (curr === "normal" && props.required)
          errors.addError(`${props.name} field is required.`);
        else if (curr === "fail")
          errors.addError(`Invalid input in field ${props.name}`);
        else errors.removeError();
        console.log("\n\n");
      },
      { immediate: true }
    );

    const { scrollInput } = ScrollUtils();

    return {
      isPopoverOpen,
      popoverEvent,
      openPopover,
      status,
      validateInput,
      inputValue,
      scrollInput,
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
    PopoverWrapper,
    ValidatorIcon,
  },
});
</script>
