<template>
  <div
    data-is-an-icon
    :style="`background-color: var(${validatorIconBackgroundColor});`"
    class="background-transition"
  >
    <transition name="icon-bounce" mode="out-in">
      <ion-icon
        :key="validatorIconBackgroundColor"
        data-is-an-icon
        :icon="validatorIcon"
      ></ion-icon>
    </transition>
  </div>
</template>

<script>
import { computed, defineComponent, toRef } from "vue";
import { IonIcon } from "@ionic/vue";
import { checkmark as successIcon, close as failIcon } from "ionicons/icons";

export default defineComponent({
  name: "ValidatorIcon",
  props: {
    status: {
      type: String,
      default: "normal",
    },
    icon: {
      type: String,
    },
  },
  setup(props) {
    const status = toRef(props, "status");

    const validatorIcon = computed(() => {
      switch (status.value) {
        case "pass":
          return successIcon;
        case "fail":
          return failIcon;
        default:
          return props.icon;
      }
    });
    const validatorIconBackgroundColor = computed(() => {
      switch (status.value) {
        case "pass":
          return "--ion-color-success";
        case "fail":
          return "--ion-color-danger";
        default:
          return "--ion-color-primary";
      }
    });

    return {
      validatorIcon,
      validatorIconBackgroundColor,
    };
  },
  components: { IonIcon },
});
</script>

<style scoped>
.background-transition {
  transition: 200ms ease-in-out;
}

.icon-bounce-enter-active {
  animation: icon-bounce-in 200ms;
}
.icon-bounce-leave-active {
  animation: icon-bounce-in 200ms reverse;
}
@keyframes icon-bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>