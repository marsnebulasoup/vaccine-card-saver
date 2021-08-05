<template>
  <ion-item :class="{ 'no-padding': noPadding }" mode="ios" lines="none">
    <ion-label v-if="$slots.default" position="stacked">
      <caption-text style="vertical-align: middle !important" :color="color">
        <slot></slot> | Is open: {{ isOpen }}
      </caption-text>
    </ion-label>
    <div @click="openPicker($event)" class="input-container">
      <ion-picker
        v-if="isOpen"
        :mode="platform"
        :columns="columns"
        :buttons="buttons"
        :is-open="isOpen"
        backdrop-dismiss="false"
        @ionChange="log('changed')"
      ></ion-picker>
      <div class="input" @click="openPicker()">Select Dose</div>
      <validator-icon
        v-if="icon"
        :icon="icon"
        class="icon"
        status="normal"
        @click="openPopover($event)"
      ></validator-icon>
    </div>
  </ion-item>

  <popover-wrapper
    v-model:isPopoverOpen="isPopoverOpen"
    v-model:popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script>
import { IonItem, IonLabel, IonPicker } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import { ref } from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";

export default {
  name: "ItemSelector",
  inject: ["platform"],
  setup() {
    // Opens Popover
    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev) => {
      // console.log(ev)
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };
    const isOpen = ref(false);

    const columns = ref([
      {
        name: "animal",
        selectedIndex: 1,
        options: [
          { text: "Dog", value: "dog" },
          { text: "Cat", value: "cat", disabled: true },
          { text: "Bird", value: "bird" },
        ],
      },
    ]);

    const buttons = ref([
      {
        text: "Confirm",
        handler: (selected) => {
          isOpen.value = false;
          console.log(`Confirmed... ${selected.animal.value}`);
        },
      },
      {
        text: "Cancel",
        handler: (selected) => {
          isOpen.value = false;
          console.log(`Canceled... ${selected.animal.value}`);
        },
      },
    ]);

    // Opens picker
    const picker = ref();
    const openPicker = () => {
      // console.log(picker.value.$el.present);
      isOpen.value = true;
      setTimeout(() => {
        const p = document.querySelector("ion-picker");
        p.querySelector("ion-picker-column").click();
      }, 175);
    };
    return {
      isPopoverOpen,
      popoverEvent,
      openPopover,
      picker,
      columns,
      buttons,
      isOpen,
      openPicker,
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
    IonPicker,
    CaptionText,
    PopoverWrapper,
    ValidatorIcon,
  },
};
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

<style>
.picker-opt-disabled {
  opacity: 0.3 !important;
}
</style>