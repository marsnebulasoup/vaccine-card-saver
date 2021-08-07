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
        :label="item"
        :key="index"
        :color="color"
        :selected="selected.includes(item)"
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

export default defineComponent({
  name: "ChipSelector",
  emits: ["selectionChanged"],
  setup(props, context) {
    const item = ref();
    const selected = ref<any>([]);

    const computeSelected = (item: any) => {
      if (props.type === "single") {
        selected.value.includes(item)
          ? (selected.value = [])
          : (selected.value = [item]);
      } else if (props.type === "multi") {
        selected.value.includes(item)
          ? (selected.value = selected.value.filter((i) => i !== item))
          : selected.value.push(item);
      }
      context.emit("selectionChanged", selected);
    };

    const { scrollInput } = ScrollUtils();
    const handleClicks = (item: any, ev: PointerEvent) => {
      computeSelected(item);
      scrollInput(ev, "x", 125);
    };

    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: PointerEvent) => {
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
      () => selected.value.length,
      (itemsAreSelected) => {
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
    type: {
      type: String,
      default: "single", // can be multi also to select multiple items
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

,
    PopoverWrapper<style scoped>
ion-icon {
  padding-right: 10px;
}
</style>