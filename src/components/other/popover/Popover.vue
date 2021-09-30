<template>
  <ion-content class="ion-padding">
    <div style="display: flex; align-items: center">
      <wrappable-title noPadding size="20" class="popover-title">{{
        popover.header
      }}</wrappable-title>
      <ion-icon @click="dismiss()" :icon="closeIcon"></ion-icon>
    </div>
    <p v-html="msg"></p>
    <img
      v-if="popover.gif"
      class="ion-margin-top popover-image"
      :src="img"
    />
  </ion-content>
</template>

<script>
import { IonContent, IonIcon } from "@ionic/vue";
import { computed, defineComponent } from "vue";
import { close as closeIcon } from "ionicons/icons";
import WrappableTitle from "../text/WrappableTitle.vue";
import { tap } from "@/utils/haptics";

export default defineComponent({
  name: "Popover",
  emits: ["dismiss"],
  setup(props, {emit}) {
    console.log(props.popover);
    const msg = computed(() => {
      const boldPattern = /\*\*(.*?)\*\*/gm;
      const html = props.popover.msg.replace(
        boldPattern,
        "<strong>$1</strong>"
      );
      return html;
    });

    const img = computed(() => {
      if (props.popover.gif) {
        return require(`@/assets/${props.popover.gif}`);
      }
      return "";
    });

    const dismiss = () => {
        tap()
        emit('dismiss')
    }
    return { msg, img, dismiss, closeIcon };
  },
  components: {
    IonContent,
    IonIcon,
    WrappableTitle,
  },
  props: {
    popover: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style>
.popover-styles .popover-content {
  margin: 16vh 30px !important;
  width: unset !important;
  max-height: 75vh;
  max-width: 85vw;
  position: unset;
}

.popover-styles .popover-title {
  font-weight: 700;
  text-transform: uppercase;
  padding-right: 25px !important; 
}

.popover-styles .popover-image {
  border-radius: 4px;
  width: 100%;
}

.popover-styles ion-icon {
  position: absolute;
  right: 15px;
  color: var(--ion-color-medium);
}
</style>