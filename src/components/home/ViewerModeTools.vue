<template>
  <info-card
    v-if="isInViewerMode"
    color="blue"
    title="Tools"
  >Some tools here</info-card>
  <info-card
    v-else
    subtitle="Tips"
    subtitleColor="success"
    color="green"
    title="You can edit, share, or delete cards by clicking on them"
  />
</template>

<script>
import { arrowForward } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import InfoCard from "../other/cards/InfoCard.vue";

export default defineComponent({
  name: "ViewerModeTools",
  setup() {
    return {
      router: useRouter(),
      arrowForward,
    };
  },
  props: {
    isInViewerMode: {
      type: Boolean,
      required: true,
    },
    card: {
      required: true,
    },
  },
  components: {
    InfoCard,
  },
});
</script>

<style scoped>
.viewer-mode-tools {
  margin-bottom: 300px;
}

ion-card {
  background: rgba(152, 223, 251, 0.3);
  box-shadow: none;
}
</style>