<template>
  <ion-item
    class="hide-item-click-animation"
    :class="{ 'no-item-padding': noPadding }"
    mode="ios"
    lines="none"
    ref="item"
  >
    <ion-label v-if="$slots.default" position="stacked">
      <caption-text style="vertical-align: middle !important" :color="color">
        <slot></slot>{{ required ? "*" : "" }}
      </caption-text>
    </ion-label>
    <div @click="openPicker($event)" class="input-container">
      <ion-datetime
        v-show="true"
        class="input"
        ref="datepicker"
        :mode="platform"
        display-format="MM/DD/YY"
        picker-format="MMMM DD YYYY"
        placeholder="Select Date"
        :value="modelValue"
        readonly
        @ionChange="selectedDate = $event.target.value"
      ></ion-datetime>
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
  <popover-wrapper
    v-model:isPopoverOpen="isPopoverOpen"
    v-model:popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonDatetime } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import ValidationPopoverWrapper from "@/components/other/popover/ValidationPopoverWrapper.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import { defineComponent, inject, onBeforeUnmount, Ref, ref, watch, watchEffect } from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";
import { ErrorHandlers, Errors } from "@/utils/other/ErrorHandlers";

export default defineComponent({
  name: "DateInput",
  inject: ["platform"],
  setup(props, { emit }) {
    const item = ref();
    // Opens Popover
    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: any) => {
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };

    // Opens datepicker
    const datepicker = ref();
    const openPicker = (ev: any) => {
      if (!ev.target.attributes.getNamedItem("data-is-an-icon"))
        datepicker.value.$el.open();
    };


    const selectedDate = ref<string>(props.modelValue || "");
    const status = ref<"normal" | "pass" | "fail">("normal");

    watch(() => props.modelValue, (modelValue) => selectedDate.value = modelValue || "")
    watch(
      selectedDate,
      (curr) => {
        status.value = curr ? "pass" : "normal";
        emit("update:modelValue", curr);
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
        if (curr === "normal" && props.required)
          addError(props.errorMsg || `${props.name} is required.`);
        else if (curr === "pass") removeError();
      },
      { immediate: true }
    );

    onBeforeUnmount(() => deleteError());

    return {
      item,
      isPopoverOpen,
      popoverEvent,
      openPopover,
      datepicker,
      openPicker,
      selectedDate,
      status,
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
  },
  components: {
    IonItem,
    IonLabel,
    IonDatetime,
    CaptionText,
    PopoverWrapper,
    ValidationPopoverWrapper,
    ValidatorIcon,
  },
});
</script>