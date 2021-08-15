import { watch, ref, Ref } from 'vue';
import { Storage } from '@capacitor/storage';

const DEBUG = false;

export default function InfoCard(id: string | undefined): Ref<boolean> {

  const exists = ref(true);

  if(!id) return exists;

  const formattedId = `infocard-${id}`;

  Storage.get({ key: formattedId })
    .then(resp => {
      if (typeof resp === "object")
        if (typeof resp.value === "string") {
          const parsed = JSON.parse(resp.value)
          if (typeof parsed === "boolean") {
            DEBUG && console.log('Setting exists to parsed')
            exists.value = parsed
          }
        }
        else DEBUG && console.log('Saved cards not found')
      else DEBUG && console.log('Saved cards not object')
    })
    .finally(() => {
      watch(exists, (curr): void => {
        DEBUG && console.log('Exists changed, saving it')
        DEBUG && console.log(curr)

        Storage.set({
          key: formattedId,
          value: JSON.stringify(exists.value)
        })
      }, { deep: true })
    });

  return exists;
}