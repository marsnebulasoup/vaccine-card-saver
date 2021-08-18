<template>
  <div class="i-hide-everything">
    <ion-header class="ion-no-border" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            default-href="home"
            @click.prevent="exitSharingMode()"
            :mode="platform"
          ></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <wrappable-title>Share this card</wrappable-title>
      </ion-toolbar>
    </ion-header>
    <div v-if="!image" class="center-me">
      <ion-progress-bar type="indeterminate"></ion-progress-bar>

      <ion-skeleton-text
        animated
        style="width: 40vw; height: 28vh; margin-top: 30px; border-radius: 5px"
      ></ion-skeleton-text>
    </div>
    <div v-else class="container">
      <div class="center-me">
        <img
          :src="image"
          class="share-image"
          :class="{ 'fade-share-image-background': shouldFadeImageBackground }"
        />
      </div>
      <share-buttons @share="handleShare($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import {
  IonProgressBar,
  IonSkeletonText,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import WrappableTitle from "../other/text/WrappableTitle.vue";
import { nudge } from "@/utils/haptics";
import ShareButtons from "../other/cards/ShareButtons.vue";
import ShareHandler from "@/utils/other/ShareHandler";
import { Card } from "@/utils/cards/card";
export default defineComponent({
  name: "ViewerModeTools",
  emits: ["exitSharingMode"],
  inject: ["platform"],
  setup(props, { emit }) {
    const image = ref("");

    /* eslint-disable @typescript-eslint/no-empty-function */
    const actions = reactive({
      shareImg: () => {},
      shareImgAndText: () => {},
      copyImg: () => {},
      copyText: () => {},
    });

    const shouldFadeImageBackground = computed(
      () => props.card.doses.length > 2
    );

    const handleShare = (shareType: string) => {
      console.log(shareType);
      switch (shareType) {
        case "Share Image": {
          actions.shareImg();
          return;
        }
        case "Share Image And Text": {
          actions.shareImgAndText();
          return;
        }
        case "Copy Image": {
          actions.copyImg();
          return;
        }
        case "Copy Text": {
          actions.copyText();
          return;
        }
      }
    };

    const exitSharingMode = () => {
      nudge();
      emit("exitSharingMode");
    };

    onMounted(() => {
      ShareHandler(props.card as Card)
        .then((acts) => {
          // acts is short for actions because I can't think of a better name 😑
          image.value = acts.image;
          Object.assign(actions, acts);
        })
        .catch((error) => {
          exitSharingMode();
          console.error(error);
        });
    });

    return { image, shouldFadeImageBackground, handleShare, exitSharingMode };
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  components: {
    IonProgressBar,
    IonSkeletonText,
    IonHeader,
    IonButtons,
    IonBackButton,
    IonToolbar,
    WrappableTitle,
    ShareButtons,
  },
});
</script>

<style scoped>
.i-hide-everything {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: var(--ion-background-color, white);
  overflow-y: scroll;
}

@media (prefers-color-scheme: dark) {
  .i-hide-everything {
    background: black; /* TODO make this a lighter black for md theme */
  }
}

.container {
  display: block;
  width: 100%;
  height: fit-content;
}

.center-me {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.share-image {
  width: 40vw;
  max-height: 35vh;
  object-fit: cover;
  object-position: 0 0;
  margin-top: 30px;
  border-radius: 5px;
  border: 2px solid var(--ion-color-secondary);
}

.fade-share-image-background {
  -webkit-mask-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>