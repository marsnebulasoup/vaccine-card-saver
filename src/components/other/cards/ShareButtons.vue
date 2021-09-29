<template>
  <div class="cards-container">
    <div v-for="(card, index) in cards" :key="index">
      <ion-card
        mode="ios"
        class="card center-everything"
        @click="handleClicks($event, card)"
        data-is-actual-card="true"
      >
        <ion-card-content class="center-everything">
          <ion-icon
            :icon="card.icon[platform === 'ios' ? 'ios' : 'md']"
          ></ion-icon>
          <caption-text size="3.5vw" style="margin-top: 10px" :inline="false">{{
            card.caption
          }}</caption-text>
        </ion-card-content>
      </ion-card>
    </div>
  </div>
</template>

<script lang="ts">
import { createAnimation, IonCard, IonCardContent, IonIcon } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import CaptionText from "../text/CaptionText.vue";
import { nudge } from "@/utils/haptics";
export default defineComponent({
  name: "ShareButtons",
  inject: ["platform"],
  emits: ["share"],
  setup(_, { emit }) {
    const cards = ref([
      {
        caption: "Share Image",
        icon: {
          md: require("@/assets/icons/shareAsImage.svg"),
          ios: require("@/assets/icons/shareAsImageIos.svg"),
        },
      },
      {
        caption: "Share Image And Text",
        icon: {
          md: require("@/assets/icons/shareImageAndTextMd.svg"),
          ios: require("@/assets/icons/shareImageAndTextIos.svg"),
        },
      },
      {
        caption: "Copy Image",
        icon: {
          md: require("@/assets/icons/copyImageToClipboard.svg"),
          ios: require("@/assets/icons/copyImageToClipboard.svg"),
        },
      },
      {
        caption: "Copy Text",
        icon: {
          md: require("@/assets/icons/copyTextToClipboard.svg"),
          ios: require("@/assets/icons/copyTextToClipboard.svg"),
        },
      },
    ]);

    const animate = async (ev: any) => {
      const path = ev.path || (ev.composedPath && ev.composedPath());
      const el: HTMLElement | undefined = path.find((el: HTMLElement) => {
        try {
          if (el.getAttribute("data-is-actual-card") === "true") return true;
        } catch (e) {
          return false;
        }
      });

      if (el) {
        nudge();
        createAnimation()
          .addElement(el)
          .duration(200)
          .iterations(1)
          .keyframes([
            { offset: 0, transform: "scale(1)" },
            { offset: 0.5, transform: "scale(1.15)" },
            { offset: 1, transform: "scale(1)" },
          ])
          .play();

        return true;
      }

      return false;
    };

    const handleClicks = async (ev: any, card: typeof cards.value[0]) => {
      if (await animate(ev)) {
        emit("share", card.caption);
      }
    };

    return {
      cards,
      handleClicks,
    };
  },
  components: {
    IonCard,
    IonCardContent,
    CaptionText,
    IonIcon,
  },
});
</script>

<style scoped>
.cards-container {
  display: grid;
  padding: 35px;
  grid-gap: 30px;

  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.cards-container .card {
  aspect-ratio: 1; /* next 11 lines are because safari doesn't fully support aspect-ratio 😑 */
  position: relative;
  width: 100%;
  padding-top: 100%;
  margin: 0;
}

.cards-container .card ion-card-content {
  position: absolute;
  top: 0;
  height: 100%;
}

.center-everything {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
}

ion-icon {
  width: 35px;
  height: 35px;
}
</style>
