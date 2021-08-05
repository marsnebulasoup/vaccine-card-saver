<template>
  <ion-item
    @click="$emit('fieldInputClicked')"
    :class="{ 'no-left-padding': noLeftPadding }"
    mode="ios"
  >
    <ion-label v-if="$slots.default" :position="position">
      <ion-text :color="color">
        <ion-icon
          v-if="icon && showIconWithLabel"
          @click="setOpen(true, $event)"
          style="vertical-align: middle !important"
          :icon="icon"
        ></ion-icon>
      </ion-text>

      <caption-text style="vertical-align: middle !important" :color="color">
        <slot></slot>
      </caption-text>
    </ion-label>
    <ion-input
      :type="type"
      :spellcheck="false"
      :maxlength="max"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :pattern="pattern"
      :required="required"
      :value="modelValue"
      @ionChange="$emit('update:modelValue', $event.target.value)"
      style="vertical-align: middle !important"
    >
      <ion-text :color="color">
        <ion-icon
          v-if="icon && !showIconWithLabel"
          @click="setOpen(true, $event)"
          style="vertical-align: middle !important"
          :icon="icon"
        ></ion-icon>
      </ion-text>
    </ion-input>
  </ion-item>
  <popover-wrapper
    :isPopoverOpen="isPopoverOpen"
    :popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script>
import { IonItem, IonLabel, IonIcon, IonInput, IonText } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import { ref } from "vue";

export default {
  name: "FieldInput",
  emits: ['fieldInputClicked'],
  setup() {
    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const setOpen = (state, ev = undefined) => {
      isPopoverOpen.value = state;
      popoverEvent.value = ev;
    };

    return { isPopoverOpen, popoverEvent, setOpen };
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
    autocomplete: {
      type: String,
      default: "off",
    },
    autocapitalize: {
      type: String,
      default: "words",
    },
    pattern: {
      type: String,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "medium",
    },
    position: {
      type: String,
      default: "stacked",
    },
    showIconWithLabel: {
      type: Boolean,
      default: false,
    },
    noLeftPadding: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
    IonText,
    CaptionText,
    PopoverWrapper,
  },
};
</script>

<style scoped>
ion-item {
  --padding-end: calc(
    var(--padding-start) + var(--ion-safe-area-left, 0px)
  ) !important;
}

.no-left-padding {
  --padding-start: 0;
}
ion-icon {
  padding-right: 10px;
}
</style>