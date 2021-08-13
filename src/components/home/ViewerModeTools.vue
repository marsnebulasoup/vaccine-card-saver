<template>
  <!-- <info-card
    v-if="isInViewerMode"
    class="viewer-mode-tools"
    color="blue"
    title="Tools"
  >

  </info-card> -->
  <!-- 👉👉👉 add a tools panel here...maybe use a fab?  -->
  <tool-fab
    @share="handleShare()"
    @edit="handleEdit()"
    @delete="handleDelete()"
    v-if="isInViewerMode"
  />
  <info-card
    v-else
    class="viewer-mode-tools"
    subtitle="Tips"
    subtitleColor="success"
    color="green"
    title="You can edit, share, or delete cards by clicking on them"
  />
</template>

<script lang="ts">
import { nudge } from "@/utils/haptics";
import { arrowForward } from "ionicons/icons";
import { defineComponent, inject, Ref } from "vue";
import { useRouter } from "vue-router";
import ToolFab from "../other/buttons/ToolFab.vue";
import InfoCard from "../other/cards/InfoCard.vue";

export default defineComponent({
  name: "ViewerModeTools",
  setup(props) {
    const router = useRouter();
    const editingCardId = inject("editingCardId") as Ref<number | undefined>;

    const handleShare = () => {
      nudge();
      console.log("Sharing");
    };
    const handleEdit = () => {
      nudge();
      console.log("Editing");
      router.push("editor");
      editingCardId.value = props?.card?.id;
    };
    const handleDelete = () => {
      nudge();
      console.log("Deleting");
    };
    return {
      router,
      handleShare,
      handleEdit,
      handleDelete,
      arrowForward,
    };
  },
  props: {
    isInViewerMode: {
      type: Boolean,
      required: true,
    },
    card: {
      type: Object,
      required: false,
    },
  },
  components: {
    InfoCard,
    ToolFab,
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