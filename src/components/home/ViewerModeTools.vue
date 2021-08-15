<template>
  <tool-fab
    @share="handleShare()"
    @edit="handleEdit()"
    @delete="handleDelete({ header: 'Delete this card?' }, deleteCard)"
    v-if="isInViewerMode"
  />
  <info-card
    v-else
    class="viewer-mode-tools"
    subtitle="Feedback"
    subtitleColor="secondary"
    color="blue"
    title="If you have any suggestions or ideas, feel free to leave a review. Any feedback is greatly appreciated."
  />
</template>

<script lang="ts">
import CardHandler from "@/utils/cards";
import { Card } from "@/utils/cards/card";
import { notify, nudge } from "@/utils/haptics";
import { NotificationType } from "@capacitor/haptics";
import { arrowForward } from "ionicons/icons";
import { defineComponent, inject, Ref } from "vue";
import { useRouter } from "vue-router";
import ToolFab from "../other/buttons/ToolFab.vue";
import InfoCard from "../other/cards/InfoCard.vue";
import { handleDelete } from "@/utils/other/AlertHandler";
export default defineComponent({
  name: "ViewerModeTools",
  setup(props) {
    const router = useRouter();
    const cards: CardHandler = inject("CardHandler") as CardHandler;
    const editingCardId = inject("editingCardId") as Ref<number | undefined>;
    const openOrCloseViewerMode = inject("openOrCloseViewerMode") as (
      card: Card | undefined,
      ev: any,
      vibrate?: boolean
    ) => void;

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

    const deleteCard = () => {
      if (typeof props?.card?.id === "number") {
        console.log("Deleting card with ID " + props.card.id);
        notify({ type: NotificationType.Success }); // open alert dialog to confirm
        cards.removeCard(props.card.id);
        openOrCloseViewerMode(undefined, props.card.id, false);
      } else {
        notify({ type: NotificationType.Warning });
        console.warn(
          "Delete failed, props.card.id is not a valid number, its type is ",
          typeof props?.card?.id
        );
      }
    };

    return {
      router,
      handleShare,
      handleEdit,
      handleDelete,
      deleteCard,
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
  margin-top: 300px;
  /* margin-bottom: 300px; */
}

ion-card {
  background: rgba(152, 223, 251, 0.3);
  box-shadow: none;
}
</style>