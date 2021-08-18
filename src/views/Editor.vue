<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios" collapse="condense">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            @click.passive="tap()"
            :mode="platform"
          ></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <!-- TODO: Make title dynamic so that it reads `Update/Edit Card` when editing it -->
        <wrappable-title>{{
          isInEditingMode ? "Modify Card" : "Add a Card"
        }}</wrappable-title>
      </ion-toolbar>
    </ion-header>
    <ion-content ref="page" :fullscreen="true">
      <error-details v-if="DEBUG" title="Content" :data="content" />
      <error-details v-if="DEBUG" title="Validation Errors" :data="errors" />

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
      <doses v-model="content.doses"></doses>
    </ion-content>
    <full-width-button @click="submitForm()" :iconRight="continueIcon"
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
  onIonViewWillEnter,
  onIonViewDidEnter,
} from "@ionic/vue";
import { defineComponent, inject, provide, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import PersonalInfoForm from "@/components/editor/personal-info-form/PersonalInfoForm.vue";
import CaptionText from "@/components/other/text/CaptionText.vue";
import Doses from "@/components/editor/dose-editor/Doses.vue";
import { arrowForward as continueIcon } from "ionicons/icons";
import FullWidthButton from "@/components/other/buttons/FullWidthButton.vue";
import WrappableTitle from "@/components/other/text/WrappableTitle.vue";
import { Card } from "@/utils/cards/card";
import { Errors, VerifyValidation } from "@/utils/other/ErrorHandlers";
import ErrorDetails from "@/components/other/text/ErrorDetails.vue";
import CardHandler from "@/utils/cards";
import { tap } from "@/utils/haptics";
// import CardHandler from "@/utils/cards";

export default defineComponent({
  name: "Editor",
  inject: ["platform"],
  setup() {
    const cards: CardHandler = inject("CardHandler") as CardHandler;
    const editingCard = inject("editingCard") as Ref<Card | undefined>;
    const isInEditingMode = ref(false);

    const router = useRouter();
    const content = ref<Card>({
      id: 0,
      lastName: "",
      firstName: "",
      middleInitial: "",
      name: "",
      dob: "",
      dobFormatted: "",
      patientNumber: "",
      fullyVaccinated: false,
      doses: [],
    });

    const resetEditor = inject("resetEditor") as Ref<boolean>;
    onIonViewWillEnter(() => {
      if (resetEditor.value) {
        content.value = {
          id: 0,
          lastName: "",
          firstName: "",
          middleInitial: "",
          name: "",
          dob: "",
          dobFormatted: "",
          patientNumber: "",
          fullyVaccinated: false,
          doses: [],
        };
      }
      if (editingCard.value !== undefined) {
        console.log("In Editing Mode, cardId is ", editingCard.value.id);
        isInEditingMode.value = true;
        content.value = cards.formatCardForEditing(editingCard.value);
        editingCard.value = undefined;
      } else isInEditingMode.value = false;
    });

    const page = ref();
    onIonViewDidEnter(() => resetEditor.value && page.value.$el.scrollToTop(0));

    const errors = ref<Errors>({});
    provide("content", content);
    provide("errors", errors);

    const submitForm = () => {
      VerifyValidation(errors, () =>
        router.push({
          name: "Preview",
          params: {
            unformattedCard: JSON.stringify(content.value),
            mode: isInEditingMode.value ? "edit" : "add",
          },
        })
      );
    };

    const DEBUG = false; // was true;
    return {
      DEBUG,
      tap,
      isInEditingMode,
      page,
      router,
      content,
      errors,
      submitForm,
      continueIcon,
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
    ErrorDetails,
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