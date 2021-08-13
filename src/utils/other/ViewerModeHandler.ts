import { nudge } from './../haptics/index';
import scrollIntoView from "scroll-into-view";
import { Ref, ref } from "vue";
import { Card } from "../cards/card";
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { useRouter } from 'vue-router';

const findCardEl = (ev: any) => ev.path.find((el: HTMLElement) => {
  try {
    return el.getAttribute("data-is-vaccine-card") !== null;
  } catch (e) {
    return false;
  }
});

export const ViewerModeHandler = (page: Ref) => {
  /*
  Basic flow of the Viewer Mode
    - User clicks on a card.
    - The card is scrolled into view, and,
      - Everything disappears except for the card.
        - First, `isInViewerMode` is set to true.
        - When `isInViewerMode` is set to true, the page elements have the CSS class "invisible" 
          applied to them, which just sets their visibility to hidden, so they still take up 
          space on the page.
        - The other cards in the list have the class "hide-card-completely" applied to them, so 
          that they don't take up any space on the page, or else there would be a bunch of empty 
          space above the cards that would not look good.
        - The page is scrolled to the top, without animation, so it looks like the card appears in
          focus immediately.
      - The device is vibrated.
      - The screen brightness is set to the maximum.
      - A small "tools" panel appears below the card.
    - User clicks on the card again.
      - The other cards reappear, but the card clicked on is still centered
        - `isInViewerMode` is set to false, so the class "hide-card-completely" is removed
        - Immediately afterwards, `isLeavingViewerMode` is set to true. This sets the class "hide-card"
          to the cards that were not selected, which basically just sets their visibility to hidden, so
          they take up space on the page, but are not visible yet. This prevents the cards from seeming to
          appear behind each other when the selected card is being scrolled into view.
        - 100ms later, the card selected is scrolled into view with no animation either.
        - When that is finished, `isLeavingViewerMode` is set to false, so now all the cards are fully 
          visible.
      - The device is vibrated.
      - The screen brightness is set back to normal.
      - The "tools" panel changes to a tips panel.

  */
  const DEBUG = false;
  const router = useRouter()

  const isInViewerMode = ref(false);
  const isLeavingViewerMode = ref(false);
  const cardInViewerMode = ref<Card>();
  const initialBrightness = ref<number>(0.5);

  router.beforeEach((to, from, next) => {
    if (isInViewerMode.value && to.name === "Home") {
      ScreenBrightness.setBrightness({ brightness: 1 })
    }
    else ScreenBrightness.setBrightness({ brightness: initialBrightness.value })
    next()
  })

  const openOrCloseViewerMode = (card: Card, ev: any) => {
    DEBUG && console.log("Viewermode click event -> ", ev);

    nudge()

    cardInViewerMode.value = card;
    const cardEl = findCardEl(ev)
    if (isInViewerMode.value) {
      isInViewerMode.value = false;
      isLeavingViewerMode.value = true;
      cardInViewerMode.value = undefined;

      setTimeout(() => scrollIntoView(cardEl, {
        time: 0,
        align: {
          top: 0,
          topOffset: 120,
        },
      }, () => isLeavingViewerMode.value = false), 100);

      ScreenBrightness.setBrightness({ brightness: initialBrightness.value })
    }
    else {
      isInViewerMode.value = true;
      ScreenBrightness.getBrightness()
        .then(info => initialBrightness.value = info.brightness)
        .then(() => ScreenBrightness.setBrightness({ brightness: 1 }))
      page.value.$el.scrollToTop()

    }
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