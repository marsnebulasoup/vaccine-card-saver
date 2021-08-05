<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios" collapse="condense">
      <ion-toolbar> </ion-toolbar>
      <ion-toolbar>
        <wrappable-title>Your Cards</wrappable-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <add-a-card v-if="/*!Cards.length*/ true"></add-a-card>

      <div v-if="DEBUG">
        <!-- For debugging the reactive cards array -->
        <button @click="update()">Update</button>
        <pre>{{ JSON.stringify(Cards, null, 2) }}</pre>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/vue";
import { defineComponent, inject, Ref } from "vue";
import { useRouter } from "vue-router";
import AddACard from "@/components/home/AddACard.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";
import { Card } from "@/utils/cards/card";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export default defineComponent({
  name: "Home",
  setup() {
    const Cards: Ref<Card[]> = inject("VaccineCards") as Ref<Card[]>;
    const router = useRouter();

    

    // For debugging the reactive Cards array
    // console.log(Cards.value);
    const DEBUG = false;
    const update = () => {
      Cards.value.push({
        id: 3,
        name: "Jim K. Foster",
        dob: "2021-07-31T17:01:25.051Z",
        dobFormatted: "7/31/2021",
        fullyVaccinated: false,
        patientNumber: "2837529873894",
        doses: [
          {
            doseNumber: "1",
            brand: "Pfizer",
            date: "",
            dateFormatted: "5/12/21",
            administeredByOrAt: "CVS9999",
            lot: "KS2384",
          },
        ],
      });
    };
    return { router, update, DEBUG, Cards };
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    AddACard,
    WrappableTitle,
  },
});
</script>

<style scoped>
/* ion-toolbar {
  margin-top: 50px;
} */

ion-title {
  font-weight: 800;
}
</style>