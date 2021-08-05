<template>
  <ion-popover
    :is-open="isPopoverOpen"
    css-class="popover-styles"
    :event="popoverEvent"
    :translucent="true"
    :enter-animation="enterAnimation"
    :leave-animation="leaveAnimation"
    @didDismiss="closePopover()"
    :keyboard-close="true"
  >
    <popover @dismiss="closePopover()"></popover>
  </ion-popover>
</template>

<script>
import { IonPopover, createAnimation } from "@ionic/vue";
import { defineComponent } from "vue";
import Popover from "@/components/other/popover/Popover.vue";

export default defineComponent({
  name: "PopoverWrapper",
  props: {
    isPopoverOpen: {
      type: Boolean,
      default: false,
    },
    popoverEvent: {
      type: Event,
      default: undefined,
    },
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
  methods: {
    enterAnimation(baseEl) {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();

      backdropAnimation
        .addElement(baseEl.querySelector("ion-backdrop"))
        .fromTo("opacity", 0, "var(--backdrop-opacity)");

      wrapperAnimation
        .addElement(baseEl.querySelector(".popover-wrapper"))
        .fromTo("opacity", 0, 0.99);

      return baseAnimation
        .addElement(baseEl)
        .easing("ease")
        .duration(250)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    },
    leaveAnimation(baseEl) {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();

      backdropAnimation
        .addElement(baseEl.querySelector("ion-backdrop"))
        .fromTo("opacity", "var(--backdrop-opacity)", 0);

      wrapperAnimation
        .addElement(baseEl.querySelector(".popover-wrapper"))
        .fromTo("opacity", 0.99, 0);

      return baseAnimation
        .addElement(baseEl)
        .easing("ease")
        .duration(250)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    },
  },
  components: {
    IonPopover,
    Popover,
  },
});
</script>