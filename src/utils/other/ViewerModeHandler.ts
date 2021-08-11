import scrollIntoView from "scroll-into-view";
import { Ref, ref } from "vue";
import { Card } from "../cards/card";

const findCardEl = (ev: any) => ev.path.find((el: HTMLElement) => {
  try {
    return el.getAttribute("data-is-vaccine-card") !== null;
  } catch (e) {
    return false;
  }
});

export const ViewerModeHandler = (page: Ref) => {
  const DEBUG = false;

  const isInViewerMode = ref(false);
  const isLeavingViewerMode = ref(false);
  const cardInViewerMode = ref<Card>();
  // const initialBrightness = ref<number>(50);

  const openOrCloseViewerMode = (card: Card, ev: any) => {
    DEBUG && console.log("Viewermode click event -> ", ev);

    cardInViewerMode.value = card;
    const cardEl = findCardEl(ev)
    if (isInViewerMode.value) {
      isInViewerMode.value = false;
      isLeavingViewerMode.value = true;
      cardInViewerMode.value = undefined;
      // set brightness back to normal
      setTimeout(() => scrollIntoView(cardEl, {
        time: 0,
        align: {
          top: 0,
          topOffset: 120,
        },
      }, () => isLeavingViewerMode.value = false), 100);
    }
    else {
      isInViewerMode.value = true;
      page.value.$el.scrollToTop()
      
      // set brightness to max
    }
    // vibrate
  };

  const shouldHideCard = (card: Card) => {
    const shouldHide =
      isLeavingViewerMode.value && cardInViewerMode.value?.id !== card.id;
    DEBUG && console.log(`Should hide card with name ${card.name} -> `, shouldHide);
    return shouldHide;
  };

  const shouldHideCardCompletely = (card: Card) => {
    const shouldHide =
      isInViewerMode.value && cardInViewerMode.value?.id !== card.id;
    DEBUG && console.log(`Should completely hide card with name ${card.name} -> `, shouldHide);
    return shouldHide;
  };

  return {
    isInViewerMode,
    isLeavingViewerMode,
    cardInViewerMode,
    openOrCloseViewerMode,
    shouldHideCard,
    shouldHideCardCompletely,
  }
}