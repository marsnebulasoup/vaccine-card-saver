<template>
  <ion-fab
    mode="ios"
    vertical="bottom"
    horizontal="center"
    slot="fixed"
  >
    <ion-fab-button class="tools-icon" @click="nudge()">
      <ion-icon style="font-size: 30px" :icon="toolsIcon"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top" style="left: -50%">
      <icon-button
        @click="$emit('share')"
        mode="md"
        color="secondary"
        :iconLeft="shareIcon"
      >
        Share
      </icon-button>
    </ion-fab-list>
    <ion-fab-list side="start">
      <icon-button
        @click="$emit('edit')"
        mode="md"
        color="success"
        :iconLeft="editIcon"
      >
        Modify
      </icon-button>
    </ion-fab-list>
    <ion-fab-list side="end">
      <icon-button
        @click="$emit('delete')"
        mode="md"
        color="danger"
        :iconLeft="deleteIcon"
      >
        Delete
      </icon-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabList, IonFabButton, IonIcon } from "@ionic/vue";
import {
  ellipsisHorizontal as toolsIcon,
  createOutline as editIcon,
  trash as deleteIcon,
  shareSocial as shareIconAndroid,
  shareOutline as shareIconIos,
} from "ionicons/icons";
import { defineComponent, inject } from "@vue/runtime-core";
import { nudge } from "@/utils/haptics";
import IconButton from "./IconButton.vue";
export default defineComponent({
  name: "ToolFab",
  emits: ['share', 'edit', 'delete'],
  setup() {
    const platform = inject("platform") as string;
    console.log(platform)
    const shareIcon = platform === "ios" ? shareIconIos : shareIconAndroid;
    return {
      platform,
      nudge,
      toolsIcon,
      editIcon,
      deleteIcon,
      shareIcon,
    };
  },
  components: {
    IonFab,
    IonFabList,
    IonFabButton,
    IonIcon,
    IconButton,
  },
});
</script>