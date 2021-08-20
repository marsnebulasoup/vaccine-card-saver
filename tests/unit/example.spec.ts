import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import LoadApp from './setup/LoadApp'

describe('Home.vue', () => {
  it('renders home vue', async () => {
    const wrapper = await LoadApp()
    const html = wrapper.html()

    expect(html).toContain("Your Cards")
    expect(html).toContain("Looks like you don't have any cards saved.")
  })
  // it('works')
})
