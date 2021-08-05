<template>
  <ion-item class="ion-no-padding" lines="none">
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
  <popover-wrapper
    v-model:isPopoverOpen="isPopoverOpen"
    v-model:popoverEvent="popoverEvent"
  ></popover-wrapper>
</template>

<script>
import { defineComponent, ref } from "vue";
import { IonLabel, IonItem, IonText, IonIcon } from "@ionic/vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import BBQChip from "@/components/other/chips/BBQChip.vue";
import PopoverWrapper from "../popover/PopoverWrapper.vue";
import scrollIntoView from "scroll-into-view";

export default defineComponent({
  name: "ChipSelector",
  emits: ["selectionChanged"],
  setup(props, context) {
    const selected = ref([]);

    const computeSelected = (item) => {
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

    const handleClicks = (item, ev) => {
      computeSelected(item);
      scrollIntoView(ev.target, { time: 125, align: { lockY: true } });
    };

    const isPopoverOpen = ref(false);
    const popoverEvent = ref();
    const openPopover = (ev) => {
      isPopoverOpen.value = true;
      popoverEvent.value = ev;
    };

    return {
      selected,
      handleClicks,
      isPopoverOpen,
      popoverEvent,
      openPopover,
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
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
  },
});
</script>

,
    PopoverWrapper<style scoped>
ion-icon {
  padding-right: 10px;
}
</style>