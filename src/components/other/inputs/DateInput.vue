<template>
  <ion-item
    class="hide-item-click-animation"
    :class="{ 'no-item-padding': noPadding }"
    mode="ios"
    lines="none"
  >
    <ion-label v-if="$slots.default" position="stacked">
      <caption-text style="vertical-align: middle !important" :color="color">
        <slot></slot>
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

  <popover-wrapper
    v-model:isPopoverOpen="isPopoverOpen"
    v-model:popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonDatetime } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import { defineComponent, ref, watch } from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";

export default defineComponent({
  name: "DateInput",
  inject: ["platform"],
  setup(_, { emit }) {
    // Opens Popover
    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev: any) => {
      // console.log(ev)
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };

    // Opens datepicker
    const datepicker = ref();
    const openPicker = (ev: any) => {
      if (!ev.target.attributes.getNamedItem("data-is-an-icon"))
        datepicker.value.$el.open();
    };

    const selectedDate = ref<string>();
    const status = ref<"normal" | "pass" | "fail">("normal");

    watch(selectedDate, (curr) => {
      status.value = "pass";
      emit("update:modelValue", curr);
    });

    return {
      isPopoverOpen,
      popoverEvent,
      openPopover,
      datepicker,
      openPicker,
      selectedDate,
      status,
      log: console.log,
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
    ValidatorIcon,
  },
});
</script>