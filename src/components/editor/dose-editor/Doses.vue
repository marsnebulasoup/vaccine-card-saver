<template>
  <section>
    <transition-group @enter="enter" @leave="leave" :css="false">
      <dose-editor
        v-for="(dose, index) in doses"
        :key="dose"
        @removeEditor="removeADose(index)"
        :class="{ 'this-is-the-last-dose-editor': index === doses.length - 1 }"
      ></dose-editor>
    </transition-group>
    <transition @enter="enter" @leave="leave" :css="false" mode="out-in">
      <add-a-dose
        v-if="doses.length < MAX_DOSES"
        @click="addADose()"
      ></add-a-dose>
    </transition>
  </section>
</template>

<script>
import { defineComponent, ref } from "vue";
import AddADose from "./AddADose.vue";
import DoseEditor from "./DoseEditor.vue";
import ListAnimations from "@/utils/animations/list";
import scrollIntoView from "scroll-into-view";

export default defineComponent({
  name: "Doses",
  setup() {
    const MAX_DOSES = 4;
    const doses = ref([]);
    const count = ref(0);
    const addADose = () => {
      doses.value.push(count.value);
      count.value++;

      // animate scroll
      setTimeout(() => {
        // let the animation start playing before starting the scroll,
        // or it won't even scroll, because the new dose editor element
        // can't be located until then.
        const card = document.querySelector(".this-is-the-last-dose-editor");
        if (card) scrollIntoView(card, { time: 125 });
      }, 50);
    };

    const removeADose = (index) => {
      console.log(index);
      console.table(doses.value);
      doses.value.splice(index, 1);
      console.table(doses.value);
    };
    return { MAX_DOSES, doses, addADose, removeADose };
  },
  methods: {
    ...ListAnimations,
  },
  components: {
    AddADose,
    DoseEditor,
  },
});
</script>

<style scoped>
</style>
