<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios" collapse="condense">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :mode="platform"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <!-- TODO: Make title dynamic so that it reads `Update/Edit Card` when editing it -->
        <wrappable-title>Add a Card</wrappable-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="DEBUG" style="margin: 10px">
        <pre>{{ JSON.stringify(content, null, 2) }}</pre>
      </div>
      <div class="caption-padding">
        <caption-text size="20" color="dark" :wrapText="true"
          >Personal Information</caption-text
        >
      </div>
      <personal-info-form></personal-info-form>
      <div class="caption-padding">
        <caption-text size="20" color="dark" :wrapText="true"
          >Vaccine Information</caption-text
        >
      </div>
      <doses></doses>
      <!-- <ion-button @click="errorMsg ? errorMsg = undefined : errorMsg = 'This is a sample error message'">Toggle error</ion-button> -->
    </ion-content>
    <full-width-button
      @click="router.push('preview')"
      :error="errorMsg"
      :iconRight="continueIcon"
      >Continue</full-width-button
    >
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { defineComponent, provide, ref } from "vue";
import { useRouter } from "vue-router";
import PersonalInfoForm from "@/components/editor/personal-info-form/PersonalInfoForm.vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import Doses from "@/components/editor/dose-editor/Doses.vue";
import { arrowForward as continueIcon } from "ionicons/icons";
import FullWidthButton from "@/components/other/buttons/FullWidthButton.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";
import { VaccineDose } from "@/utils/cards/card";

export default defineComponent({
  name: "Editor",
  inject: ["platform"],
  setup() {
    const router = useRouter();
    const content = ref({
      id: 0,
      lastName: "",
      firstName: "",
      middleInitial: "",
      dob: "",
      patientNumber: "",
      fullyVaccinated: false,
      doses: [],
    });
    provide("content", content);

    interface DeleteMeIExistOnlyForReference {
      id: number;
      lastName: string;
      firstName: string;
      middleInitial: string;
      dob: string;
      patientNumber?: string;
      fullyVaccinated: boolean;
      doses: VaccineDose[];
    }
    const errorMsg = ref();
    const DEBUG = true;
    return {
      DEBUG,
      router,
      content,
      continueIcon,
      errorMsg,
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    PersonalInfoForm,
    CaptionText,
    Doses,
    FullWidthButton,
    WrappableTitle,
  },
});
</script>

<style scoped>
ion-title {
  font-weight: 800;
}

ion-content {
  --padding-top: 30px;
}

.caption-padding {
  margin-left: 15px;
  margin-right: 15px;
}
</style>