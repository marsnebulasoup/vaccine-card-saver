import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import router from '@/router';
import './matchMedia'

export default async function LoadApp() {
  router.push('/')

  // After this line, router is ready
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [router],
      provide: {
        platform: "md"
      }
    }
  })

  return wrapper
}