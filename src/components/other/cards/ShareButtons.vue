<template>
  <div class="cards-container">
    <ion-card
      v-for="(card, index) in cards"
      :key="index"
      mode="ios"
      class="card center-everything"
      @click="handleClicks($event, card)"
      data-is-actual-card="true"
    >
      <ion-card-content class="center-everything">
        <ion-icon :icon="card.icon"></ion-icon>
        <caption-text style="margin-top: 10px" :inline="false">{{
          card.caption
        }}</caption-text>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { createAnimation, IonCard, IonCardContent, IonIcon } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import CaptionText from "../text/CaptionText.vue";
import { shareOutline as shareAsImage } from "ionicons/icons";
import { nudge } from "@/utils/haptics";
export default defineComponent({
  name: "ShareButtons",
  emits: ["share"],
  setup(_, { emit }) {
    const cards = ref([
      {
        caption: "Share Image",
        icon: shareAsImage,
      },
      {
        caption: "Share Image And Text",
        icon: shareAsImage,
      },
      {
        caption: "Copy Image",
        icon: shareAsImage,
      },
      {
        caption: "Copy Text",
        icon: shareAsImage,
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
/* ion-card {
  box-shadow: none;
  --green: 132, 252, 148;
  --red: 255, 94, 94;
  --blue: 120, 200, 253;
  --yellow: 228, 255, 110;
} */

.cards-container {
  display: grid;
  padding: 35px;
  grid-gap: 30px;

  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.cards-container .card {
  aspect-ratio: 1;
  margin: 0;
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
