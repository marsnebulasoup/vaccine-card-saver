import { Haptics, ImpactStyle, VibrateOptions, NotificationOptions  } from '@capacitor/haptics';


export const tap = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

export const nudge = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

export const slap = async () => {
  await Haptics.impact({ style: ImpactStyle.Heavy });
};

export const notify = async (options?: NotificationOptions) => {
  await Haptics.notification(options);
};

export const vibrate = async (options?: VibrateOptions) => {
  await Haptics.vibrate(options);
};

export const hapticsSelectionStart = async () => {
  await Haptics.selectionStart();
};

export const hapticsSelectionChanged = async () => {
  await Haptics.selectionChanged();
};

export const hapticsSelectionEnd = async () => {
  await Haptics.selectionEnd();
};