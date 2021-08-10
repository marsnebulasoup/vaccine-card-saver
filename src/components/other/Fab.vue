<template>
  <ion-fab mode="ios" vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon :icon="fabIcon"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { addOutline as fabIcon } from "ionicons/icons";
export default {
  name: "Fab",
  setup() {
    
    return {
      fabIcon,
    };
  },
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },
};
</script>

<style scoped>
ion-fab {
  margin: 0 15px 30px 0;
}

ion-icon {
  font-size: 30px;
}
</style>