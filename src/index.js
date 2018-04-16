import LivePreview from './components/LivePreview.vue'
import VueCodemirror from 'vue-codemirror'

import 'codemirror/mode/vue/vue'

// Install the components
export function install (Vue, options = {}) {
  LivePreview.Vue = Vue
  Vue.component(LivePreview.name, LivePreview)
  Vue.use(VueCodemirror, {
    options: options,
  })
}

// Expose the components
export {
  LivePreview,
  VueCodemirror,
  /* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install,
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
