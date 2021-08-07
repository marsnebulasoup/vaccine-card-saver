<template>
  <ion-popover
    mode="ios"
    :is-open="isPopoverOpen"
    :event="popoverEvent"
    :translucent="true"
    @didDismiss="closePopover()"
    :keyboard-close="true"
  >
    <popover @dismiss="closePopover()" :message="message"></popover>
  </ion-popover>
</template>

<script>
import { IonPopover } from "@ionic/vue";
import { defineComponent } from "vue";
import Popover from "@/components/other/popover/ValidationPopover.vue";

export default defineComponent({
  name: "PopoverWrapper",
  props: {
    isPopoverOpen: {
      type: Boolean,
      default: false,
    },
    popoverEvent: {
      type: Object,
      default: undefined,
    },
    message: {
      type: String,
      required: true
    }
  },
  setup(_, context) {
    const closePopover = () => {
      context.emit("update:isPopoverOpen", false);
      context.emit("update:popoverEvent", undefined);
    };

    return {
      closePopover,
    };
  },  
  components: {
    IonPopover,
    Popover,
  },
});
</script>