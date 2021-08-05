<template>
  <ion-item :class="{ 'no-padding': noPadding }" mode="ios" lines="none">
    <ion-label v-if="$slots.default" position="stacked">
      <caption-text
        style="vertical-align: middle !important"
        :color="color"
        :wrapText="wrapCaption"
      >
        <slot></slot>
      </caption-text>
    </ion-label>
    <div class="input-container">
      <input
        :type="type"
        :maxlength="max"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        v-model="inputValue"
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
import { defineComponent, ref, toRef, watch } from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";
import { InputValidators, ScrollUtils } from "@/utils/other";

export default defineComponent({
  name: "FieldInput",
  setup(props, context) {
    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: Event) => {
      console.log(ev);
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };

    // const initialValue = props.modelValue;
    // 👉👉👉 Figure out how to fix the problem where when you enter an invalid char
    // into the input, it will erase the first time for some reason. Probably has something
    // to do with the v-model here.

    const status = ref<"normal" | "pass" | "fail">("normal");
    const { validateInput } = InputValidators(
      toRef(props, "pattern"),
      status,
      context.emit
    );
    const { scrollInput } = ScrollUtils();

    const inputValue = ref(props.modelValue || "");
    watch(inputValue, (curr) => {
      validateInput(curr);
    });

    return {
      isPopoverOpen,
      popoverEvent,
      openPopover,
      status,
      validateInput,
      inputValue,
      scrollInput,
    };
  },
  props: {
    modelValue: {
      type: String,
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

<style scoped>
ion-item {
  --padding-end: 10px;
}

.no-padding {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
}

.input-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.input-container .input {
  width: 100%;
  height: 100%;
  padding: 10px;
  outline: none;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: oldlace;
}

.input-container .icon {
  /* padding: 3px; */
  height: 100%;
  color: white;
  min-width: 40px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>