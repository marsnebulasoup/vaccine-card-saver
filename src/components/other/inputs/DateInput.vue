<template>
  <ion-item :class="{ 'no-padding': noPadding }" mode="ios" lines="none">
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

<style scoped>
ion-item {
  --padding-end: 10px;

  /* hides click animation on the ion-item element when the input is clicked */
  --background-activated: #fff;
  --background-activated-opacity: 1;
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