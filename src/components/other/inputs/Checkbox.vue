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
        :captionColor="captionColor"
      >
        <slot></slot>
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
  <!-- 👉👉👉 popover doesn't open when clicking on the icon, instead it just toggle the checkbox -->
  <popover-wrapper
    v-model:isPopoverOpen="isPopoverOpen"
    v-model:popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonCheckbox, IonText } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import PopoverWrapper from "@/components/other/popover/PopoverWrapper.vue";
import { defineComponent, onMounted, ref, watch } from "vue";
import ValidatorIcon from "@/components/other/inputs/ValidatorIcon.vue";

export default defineComponent({
  name: "Checkbox",
  inject: ["platform"],
  setup(_, { emit }) {
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
      isPopoverOpen,
      popoverEvent,
      openPopover,
      isSelected,
      status,
      checkbox,
    };
  },
  props: {
    modelValue: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "",
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