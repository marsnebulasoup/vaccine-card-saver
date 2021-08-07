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
        :captionColor="captionColor"
      >
        <slot></slot>{{ required ? "*" : "" }}
      </caption-text>
    </ion-label>
    <div class="input-container">
      <div class="checkbox-container">
        <ion-checkbox
          ref="checkbox"
          mode="ios"
          :color="color"
          @ionChange="isSelected = $event.target.checked"
          :checked="modelValue"
        >
        </ion-checkbox>
        <ion-text color="medium" class="placeholder">
          {{ placeholder }}
        </ion-text>
      </div>
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
import { IonItem, IonLabel, IonCheckbox, IonText } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import ValidationPopoverWrapper from "@/components/other/popover/ValidationPopoverWrapper.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
  watch,
} from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";
import { Errors, ErrorHandlers } from "@/utils/other/ErrorHandlers";

export default defineComponent({
  name: "Checkbox",
  inject: ["platform"],
  setup(props, { emit }) {
    const item = ref();
    // Opens Popover
    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: Event) => {
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };

    const isSelected = ref<boolean>();
    const status = ref<"normal" | "pass" | "fail">("normal");

    watch(isSelected, (curr) => {
      status.value = curr ? "pass" : "normal";
      emit("update:modelValue", curr);
    });

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

    // Unfortunately ion-checkbox dumps a full-width label over the container, so any clicks
    // are navigated to the checkbox, and the the popover can't be opened. This attempts to
    // remove the label if possible, so the popover can be opened, however it's really not an
    // ideal solution...though it seems to work.
    const checkbox = ref();
    onMounted(() =>
      setTimeout(() => {
        try {
          checkbox.value.$el.shadowRoot.querySelector("label").style.width = 0;
        } catch (e) {
          console.log(
            "Unable to remove the label covering the ion-checkbox element. Error 👇"
          );
          console.error(e);
        }
      }, 500)
    );

    return {
      item,
      isPopoverOpen,
      popoverEvent,
      openPopover,
      isSelected,
      status,
      isValidatorErrorVisible,
      validatorErrorMsg,
      validatorErrorEl,
      checkbox,
    };
  },
  props: {
    modelValue: {
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "",
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
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonItem,
    IonLabel,
    IonText,
    IonCheckbox,
    CaptionText,
    ValidationPopoverWrapper,
    PopoverWrapper,
    ValidatorIcon,
  },
});
</script>

<style scoped>
ion-checkbox {
  --transition: 175ms ease-in-out;
}

.checkbox-container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  outline: none;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: oldlace;
}

.placeholder {
  white-space: nowrap;
  font-size: 0.95em;
}
</style>