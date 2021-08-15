<template>
  <ion-item ref="item" class="ion-no-padding" lines="none">
    <ion-label style="max-width: fit-content" slot="start">
      <ion-text :color="captionColor">
        <ion-icon
          @click="openPopover($event)"
          v-if="icon"
          style="vertical-align: middle !important"
          :icon="icon"
        ></ion-icon>
      </ion-text>

      <caption-text
        style="vertical-align: middle !important"
        :color="captionColor"
      >
        <slot></slot>
      </caption-text>
    </ion-label>
    <div
      style="max-width: fit-content"
      slot="end"
      class="bbq-chips-bag ion-no-margin"
    >
      <bbq-chip
        v-for="(item, index) in items"
        :label="item.value"
        :key="index"
        :color="color"
        :disabled="item.disabled && selected !== item.value"
        :selected="selected === item.value"
        @click="handleClicks(item, $event)"
      ></bbq-chip>
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
    v-if="popover"
    :popover="popover"
  ></popover-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject, onBeforeUnmount, Ref } from "vue";
import { IonLabel, IonItem, IonText, IonIcon } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import BBQChip from "@/components/other/chips/BBQChip.vue";
import PopoverWrapper from "../popover/PopoverWrapper.vue";
import ValidationPopoverWrapper from "../popover/ValidationPopoverWrapper.vue";
import { ScrollUtils } from "@/utils/other";
import { ErrorHandlers, Errors } from "@/utils/other/ErrorHandlers";
import { nudge } from "@/utils/haptics";

export default defineComponent({
  name: "ChipSelector",
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const DEBUG = false;

    const item = ref();
    const selected = ref(props.modelValue || "");

    const computeSelected = ({
      value,
      disabled,
    }: {
      value: string;
      disabled: boolean;
    }) => {
      // if disabled but already selected, unselect on click
      if (disabled && selected.value === value) {
        DEBUG && console.log("Already selected and disabled, unselecting");
        selected.value = "";
      }
      // if not disabled, unselect if already selected or select if unselected
      else if (!disabled) {
        DEBUG && console.log("Not disabled,");
        if (selected.value === value) {
          selected.value = "";
          DEBUG && console.log("...unselecting");
        } else {
          selected.value = value;
          DEBUG && console.log("...selecting");
        }
      }
      emit("update:modelValue", selected.value);
    };

    const { scrollInput } = ScrollUtils();
    const handleClicks = (item: any, ev: PointerEvent) => {
      computeSelected(item);
      scrollInput(ev, "x", 125);
    };

    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: PointerEvent) => {
      nudge()
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };

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
      () => selected.value,
      (itemsAreSelected) => {
        console.log("itemsAreSelected, ", itemsAreSelected);
        if (itemsAreSelected) removeError();
        else addError(props.errorMsg || `${props.name} is required.`);
      },
      { immediate: true }
    );

    onBeforeUnmount(() => deleteError());

    return {
      item,
      selected,
      handleClicks,
      isPopoverOpen,
      popoverEvent,
      openPopover,
      isValidatorErrorVisible,
      validatorErrorMsg,
      validatorErrorEl,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
    },
    items: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
    },
    color: {
      type: String,
      default: "primary",
    },
    captionColor: {
      type: String,
      default: "medium",
    },
    icon: {
      type: String,
      default: undefined,
    },
    popover: {
      type: Object,
      required: true
    }
  },
  components: {
    "bbq-chip": BBQChip,
    PopoverWrapper,
    CaptionText,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    ValidationPopoverWrapper,
  },
});
</script>

<style scoped>
ion-icon {
  padding-right: 10px;
}
</style>