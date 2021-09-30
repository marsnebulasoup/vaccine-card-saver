<template>
  <ion-icon
    @click="handleClicks($event)"
    class="icon"
    :class="{ left: position === 'left', right: position === 'right' }"
    :icon="icon"
    :style="`font-size: ${size} !important`"
  ></ion-icon>
</template>

<script lang="ts">
import { createAnimation, IonIcon } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { nudge } from "@/utils/haptics";
export default defineComponent({
  name: "ToggleButton",
  inject: ["platform"],
  emits: ["clicked"],
  setup(props, { emit }) {
    const icon = ref(props.iconDefault);
    const status = ref(false);

    const animate = (ev: any, newIcon?: string) => {
      props.vibrate && nudge();
      const duration = 200;
      const animation = createAnimation()
        .addElement(ev.target)
        .duration(duration)
        .iterations(1)
        .keyframes([
          { offset: 0, transform: "scale(1)" },
          { offset: 0.25, transform: "scale(1.15)" },
          { offset: 0.5, transform: "scale(0)" },
          { offset: 1, transform: "scale(1)" },
        ]);
      animation.play();
      setTimeout(() => {
        animation.pause();
        newIcon && (icon.value = newIcon);
        animation.play();
      }, duration / 2);
    };

    const handleClicks = async (ev: any) => {
      const newIcon =
        props.iconSecondary &&
        (icon.value === props.iconDefault
          ? props.iconSecondary
          : props.iconDefault);
      status.value = !status.value;
      console.log(status.value)
      animate(ev, newIcon);
      emit("clicked", status.value);
    };

    return {
      handleClicks,
      icon,
    };
  },
  props: {
    iconDefault: {
      type: String,
      required: true,
    },
    iconSecondary: {
      type: String,
      required: false,
    },
    position: {
      type: String, // left, right
    },
    vibrate: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "30px"
    }
  },
  components: {
    IonIcon,
  },
});
</script>

<style scoped>
.icon {
  position: fixed;
  top: 50px;
}

.right {
  right: 15px;
}

.left {
  left: 15px;
}
</style>
