import { nudge } from './../haptics/index';
import scrollIntoView from "scroll-into-view";
import { Ref, ref, watch } from "vue";
import { Card } from "../cards/card";
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { useRouter } from 'vue-router';
import { useBackButton } from '@ionic/vue';

export const findCardEl = (ev: any) => {
  if (typeof ev === "number") {
    try {
      const el = document.querySelector(`[data-vaccine-card-id="${ev}"]`)
      return el
    }
    catch (e) {
      console.error("Unable to find ion-card with data-vaccine-card-id attribute equal to ", ev)
      console.error(e)
    }
  }
  const path = ev.path || (ev.composedPath && ev.composedPath());
  return path.find((el: HTMLElement) => {
    try {
      return el.getAttribute("data-vaccine-card-id") !== null;
    } catch (e) {
      return false;
    }
  });
}

const getBrightness = async (initialBrightness: Ref<number>) => {
  const DEBUG = false;
  try {
    const info = await ScreenBrightness.getBrightness()
    initialBrightness.value = info.brightness
    return
  } catch (error) {
    DEBUG && console.error(error)
  }
}

const setBrightness = (newBrightness: number) => {
  const DEBUG = false;
  const NO_BRIGHTNESS = false; // TODO: set to false for production build
  try {
    NO_BRIGHTNESS || ScreenBrightness.setBrightness({ brightness: newBrightness })
  } catch (error) {
    DEBUG && console.error(error)
  }
}



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
  const shouldChangeBrightness = ref(false);

  getBrightness(initialBrightness)

  const openOrCloseViewerMode = (card: Card | undefined, ev: any, vibrate?: boolean) => {
    DEBUG && console.log("Viewermode click event -> ", ev);

    vibrate !== false && nudge()

    cardInViewerMode.value = card;
    const cardEl = findCardEl(ev)
    if (isInViewerMode.value) {
      isInViewerMode.value = false;
      isLeavingViewerMode.value = true;
      cardInViewerMode.value = undefined;
      shouldChangeBrightness.value = false;

      setTimeout(() => scrollIntoView(cardEl, {
        time: 0,
        align: {
          top: 0,
          topOffset: 120,
        },
      }, () => isLeavingViewerMode.value = false), 100);

      setBrightness(initialBrightness.value)
    }
    else {
      isInViewerMode.value = true;
      if (shouldChangeBrightness.value) getBrightness(initialBrightness).then(() => setBrightness(1))
      page.value.$el.scrollToTop()
    }
  };

  watch(shouldChangeBrightness, (curr) => {
    curr ? setBrightness(1) : setBrightness(initialBrightness.value)
  })


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


  const registerBackButtonHandler = () => {
    return useBackButton(9, (/* processNextHandler */) => {
      if (isInViewerMode.value) openOrCloseViewerMode(undefined, cardInViewerMode.value?.id, false)
      // processNextHandler()
    }).unregister;
  }

  let unregisterBackButtonHandler = registerBackButtonHandler()

  router.beforeEach((to, from, next) => {
    unregisterBackButtonHandler()
    if (to.name === "Home") {
      unregisterBackButtonHandler = registerBackButtonHandler()

      if (isInViewerMode.value && shouldChangeBrightness.value) {
        setBrightness(1)
      }
    }
    else setBrightness(initialBrightness.value)
    next()
  })

  return {
    isInViewerMode,
    isLeavingViewerMode,
    cardInViewerMode,
    shouldChangeBrightness,
    openOrCloseViewerMode,
    shouldHideCard,
    shouldHideCardCompletely,
  }
}