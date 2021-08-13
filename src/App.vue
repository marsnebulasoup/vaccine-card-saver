<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, isPlatform } from "@ionic/vue";
import { defineComponent, onMounted, provide, ref } from "vue";
import { useRouter } from "vue-router";
import Transitions from "./utils/PageTransition";
import CardHandler from "@/utils/cards";
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

    const resetEditor = ref(true);
    router.beforeEach((to, from, next) => {
      console.log(`Routing from `, from, " to ", to);
      if (to.name === "Editor" && from.name == "Preview")
        resetEditor.value = false;
      else resetEditor.value = true;
      next();
    });

    provide("CardHandler", new CardHandler());
    provide("VaccineBrands", new Brands());
    provide("platform", isPlatform("ios") ? "ios" : "md");
    provide("resetEditor", resetEditor);
    provide("editingCardId", ref<number>())
  },
});
</script>