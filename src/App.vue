<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, isPlatform } from "@ionic/vue";
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import Transitions from "./utils/PageTransition";
import Cards from "@/utils/cards";
import Brands from "@/utils/cards/brands";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const router = useRouter();
    onMounted(() => {
      Transitions.HandleTransitions(router);
    });
  },
  provide() {
    return {
      VaccineCards: Cards(),
      VaccineBrands: new Brands(),
      platform: isPlatform("ios") ? "ios" : "md",
    };
  },
});
</script>